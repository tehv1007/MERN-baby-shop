const router = require("express").Router();
const {
  addOrder,
  deleteOrder,
  getOrdersByUser,
  getOrderById,
  getRecentOrdersByCustomer,
  countOrdersByStatusAndUser,
  cancelOrder,
} = require("../controllers/orderController");

//GET user orders
router.get("/:userId/my-orders", getOrdersByUser);

//GET order by ID
router.get("/:orderId", getOrderById);

// PUT cancel an order by customer
router.put("/:orderId/cancel", cancelOrder);

//GET recent orders of an user
router.get("/:userId/recent-orders", getRecentOrdersByCustomer);

// Count Orders By Status and User
router.get("/:userId/count-orders", countOrdersByStatusAndUser);

//CREATE an order
router.post("/:userId", addOrder);

//DELETE an order by ID
router.delete("/:userId", deleteOrder);

module.exports = router;
