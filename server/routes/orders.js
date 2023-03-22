const router = require("express").Router();
const {
  addOrder,
  deleteOrder,
  getOrdersByUser,
  getOrderById,
} = require("../controllers/orderController");

//GET user orders
router.get("/:userId/orders", getOrdersByUser);

//GET order by ID
router.get("/:orderId", getOrderById);

//CREATE an order
router.post("/:userId", addOrder);

//DELETE an order by ID
router.delete("/:userId", deleteOrder);

module.exports = router;
