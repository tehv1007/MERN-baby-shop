const Order = require("../models/Order");

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

    const order = await Order.create({
      userId: userId,
      amount: data.amount,
      address: data.address,
      transaction_id: data.transaction_id,
      products: data.products,
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

// GET monthly income
exports.getIncome = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};
