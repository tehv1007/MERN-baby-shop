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
    res.status(500).json(err);
  }
};

//CREATE an order
exports.addOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = req.body.order;
    console.log(data);

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
    res.status(500).send("Something went wrong");
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
    res.status(500).json(err);
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

    res.json({
      success: true,
      message: "Order status updated successfully",
      order: updateOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//DELETE an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
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
    res.status(500).json(err);
  }
};

// GET order by id
exports.getOrderById = async (req, res) => {
  const selectedItem = await Order.findById(req.params.orderId);
  if (!selectedItem)
    res.json({
      message: `Product with id '${req.params.orderId}' not found`,
    });
  res.json(selectedItem);
};

// Get recent orders
exports.getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    res.status(500).json({ message: err.message });
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
    res.status(500).json({ message: err.message });
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
    res.status(500).json({ message: err.message });
  }
};

// Get total revenue
exports.getTotalRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get monthly revenue
exports.getMonthlyRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get daily revenue for 30 days
exports.getDailyRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tính doanh thu hôm nay
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

// Tính doanh thu tháng này
exports.getThisMonthRevenue = async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lt: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json(result[0].totalRevenue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Top 10 sản phẩm bán chạy nhất
exports.getTopSellingProducts = async (req, res) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  try {
    const result = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.productId",
          // name: "$products.name",
          quantity: { $sum: "$products.quantity" },
        },
      },
      { $sort: { quantity: -1 } },
      { $limit: 7 },
    ]);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get doanh thu hàng tuần
exports.getWeeklySales = async (req, res) => {
  try {
    const weeklySales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
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
    res.status(500).json({ message: error.message });
  }
};

// Get số đơn hàng mỗi ngày cho 7 ngày gần nhất
exports.getDailyOrderCount = async (req, res) => {
  try {
    const startDate = moment().subtract(6, "days").toDate();
    const endDate = moment().toDate();

    // Get list of dates within the date range
    const dates = [];
    let currDate = moment(startDate);
    while (currDate.isSameOrBefore(endDate)) {
      dates.push(currDate.format("YYYY-MM-DD"));
      currDate.add(1, "days");
    }

    // Aggregate orders by day
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ]);

    // Create a map to hold the daily order counts
    const orderCounts = new Map();
    for (const item of result) {
      orderCounts.set(item._id, item.count);
    }

    // Add missing dates with zero order count
    for (const date of dates) {
      if (!orderCounts.has(date)) {
        orderCounts.set(date, 0);
      }
    }

    // Sort the order counts by date
    const sortedOrderCounts = new Map([...orderCounts.entries()].sort());

    // Convert the map to an array of objects
    const orderCountArray = [];
    for (const [date, count] of sortedOrderCounts.entries()) {
      orderCountArray.push({ date, count });
    }

    res.status(200).json(orderCountArray);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get  doanh thu mỗi ngày cho 7 ngày gần nhất
exports.getRecentDailyRevenue = async (req, res) => {
  try {
    const sevenDaysAgo = moment().subtract(7, "days").startOf("day").toDate();

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);

    // Nếu không có doanh thu cho các ngày trong tuần trước đó, thêm các giá trị mặc định vào
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
    res.status(500).json({ message: err.message });
  }
};
