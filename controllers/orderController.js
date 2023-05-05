const Order = require("../models/Order");
const User = require("../models/User");
const moment = require("moment");

//GET ALL orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//CREATE an order
exports.addOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = req.body.order;
    console.log(data);

    // const cart = await Cart.find({ userId: userId });

    const order = await Order.create({
      phoneNumber: data.phoneNumber,
      userId: userId,
      amount: data.amount,
      address: data.address,
      transaction_id: data.transaction_id,
      products: data.products,
      paymentMethod: data.paymentMethod,
    });

    return res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//UPDATE an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updateOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//DELETE an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order has been deleted..." });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//GET user orders
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET order by id
exports.getOrderById = async (req, res) => {
  try {
    const selectedItem = await Order.findById(req.params.orderId);
    if (!selectedItem)
      res.status(404).json({
        message: `Product with id '${req.params.orderId}' not found`,
      });
    res.status(200).json(selectedItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get recent orders
exports.getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get recent orders of an user
exports.getRecentOrdersByCustomer = async (req, res) => {
  try {
    const userId = req.params.userId;
    const customer = await User.findById(userId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const orders = await Order.find({ userId: userId })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Count orders by status
exports.countOrdersByStatus = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });
    const processingOrders = await Order.countDocuments({
      status: "Processing",
    });
    const shippedOrders = await Order.countDocuments({ status: "Shipped" });
    const deliveredOrders = await Order.countDocuments({ status: "Delivered" });
    const cancelledOrders = await Order.countDocuments({ status: "Cancelled" });
    res.status(200).json({
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
    });
  } catch (err) {
    // res.status(500).json({ message: err.message });
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Count orders by status and user
exports.countOrdersByStatusAndUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const totalOrders = await Order.countDocuments({ userId: userId });
    const pendingOrders = await Order.countDocuments({
      userId: userId,
      status: "Pending",
    });
    const processingOrders = await Order.countDocuments({
      userId: userId,
      status: "Processing",
    });
    const shippedOrders = await Order.countDocuments({
      userId: userId,
      status: "Shipped",
    });
    const deliveredOrders = await Order.countDocuments({
      userId: userId,
      status: "Delivered",
    });
    const cancelledOrders = await Order.countDocuments({
      userId: userId,
      status: "Cancelled",
    });
    res.status(200).json({
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get total revenue (excluding cancelled orders)
exports.getTotalRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $match: {
          status: { $ne: "Cancelled" }, // only include orders with status not equal to "cancelled"
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json(result[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Calculate today's revenue
exports.getTodayRevenue = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);

    const revenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json(revenue);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Calculate this month's revenue
exports.getThisMonthRevenue = async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lt: endOfMonth },
          status: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);

    const revenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json(revenue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Top 10 best selling products
exports.getTopSellingProducts = async (req, res) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  try {
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          status: { $ne: "Cancelled" },
        },
      },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.name",
          quantity: { $sum: "$products.quantity" },
        },
      },
      { $sort: { quantity: -1 } },
      { $limit: 7 },
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get weekly revenue
exports.getWeeklySales = async (req, res) => {
  try {
    const weeklySales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          status: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%U", date: "$createdAt" },
          },
          totalSales: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(weeklySales);
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get daily revenue for the last 7 days
exports.getRecentDailyRevenue = async (req, res) => {
  try {
    const sevenDaysAgo = moment().subtract(7, "days").startOf("day").toDate();

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          status: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);

    // If there is no sales for the previous weekday, add default values to
    const today = moment().startOf("day");
    for (let i = 0; i < 7; i++) {
      const date = today.clone().subtract(i, "days").format("YYYY-MM-DD");
      const existing = result.find((item) => item._id === date);
      if (!existing) {
        result.push({ _id: date, totalRevenue: 0 });
      }
    }

    const sortArr = result.sort((a, b) => {
      let da = new Date(a._id),
        db = new Date(b._id);
      return da - db;
    });

    res.status(200).json(sortArr);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get daily order number for the last 7 days
exports.getRecentDailyOrders = async (req, res) => {
  try {
    const sevenDaysAgo = moment().subtract(7, "days").startOf("day").toDate();

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          status: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    // If there are no orders for the previous weekdays, add default values to
    const today = moment().startOf("day");
    for (let i = 0; i < 7; i++) {
      const date = today.clone().subtract(i, "days").format("YYYY-MM-DD");
      const existing = result.find((item) => item._id === date);
      if (!existing) {
        result.push({ _id: date, totalOrders: 0 });
      }
    }

    const sortArr = result.sort((a, b) => {
      let da = new Date(a._id),
        db = new Date(b._id);
      return da - db;
    });

    res.status(200).json(sortArr);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    // Get order information from database by ID
    const order = await Order.findById(orderId);

    // Check if the order is in "pending" status
    if (order.status === "Pending") {
      // Update order's status to "cancelled"
      order.status = "Cancelled";
      await order.save();

      res.json({ message: "Order has been cancelled." });
    } else {
      res.status(400).json({
        message:
          "The order is being processed, so it cannot be cancelled. Please contact the store owner",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
