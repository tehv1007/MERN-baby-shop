const router = require("express").Router();
const { getAllUsers, getUserStats } = require("../controllers/userController");

const {
  deleteOrder,
  getAllOrders,
  getIncome,
  updateOrderStatus,
  getOrderById,
  getOrdersByUserId,
  getOrdersByUser,
} = require("../controllers/orderController");

const {
  getAllProduct,
  searchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
} = require("../controllers/productController");

// Users
//GET ALL USER
router.get("/users", getAllUsers);

//GET USER STATS
router.get("/users/stats", getUserStats);

//Order
//GET ALL orders
router.get("/orders/:orderId", getOrderById);
router.get("/:userId/orders", getOrdersByUser);
router.put("/orders/:id", updateOrderStatus);
router.get("/orders", getAllOrders);

//DELETE an order by ID
router.delete("/orders/:userId", deleteOrder);

// GET monthly income
router.get("/orders/income", getIncome);

//Products
// GET all products
router.get("/products", getAllProduct);

// UPDATE a product by ID
router.put("/products/:productId", updateProduct);

// DELETE product by ID
router.delete("/products/:productId", deleteProduct);

// Delete multiple products
router.delete("/products", deleteProducts);

// Search product
router.get("/products/search", searchProduct);

// CREATE a new product
router.post("/products/new", addProduct);

module.exports = router;
