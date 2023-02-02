const router = require("express").Router();
const {
  deleteUser,
  getAllUsers,
  getUserStats,
} = require("../controllers/userController");

const {
  deleteOrder,
  getAllOrders,
  getIncome,
} = require("../controllers/orderController");

const {
  getAllProduct,
  searchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Users
//GET ALL USER
router.get("/", getAllUsers);

//DELETE user by ID
router.delete("/:id", deleteUser);

//GET USER STATS
router.get("/stats", getUserStats);

//Order
//GET ALL orders
router.get("/", getAllOrders);

//DELETE an order by ID
router.delete("/:userId", deleteOrder);

// GET monthly income
router.get("/income", getIncome);

//Products

// GET all products
router.get("/", getAllProduct);

// UPDATE a product by ID
router.put("/:productId", updateProduct);

// DELETE product by ID
router.delete("/:productId", deleteProduct);

// Search product
router.get("/search", searchProduct);

// CREATE a new product
router.post("/new", addProduct);

module.exports = router;
