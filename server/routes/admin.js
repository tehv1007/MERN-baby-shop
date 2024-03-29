const router = require("express").Router();
const {
  getAllUsers,
  updateUserStatus,
} = require("../controllers/userController");

const {
  deleteOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  getOrdersByUser,
  getTotalRevenue,
  countOrdersByStatus,
  getRecentOrders,
  getTodayRevenue,
  getThisMonthRevenue,
  getTopSellingProducts,
  getRecentDailyRevenue,
  getRecentDailyOrders,
} = require("../controllers/orderController");

const {
  getAllProduct,
  searchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
} = require("../controllers/productController");

/*-------------------USER-------------------*/
//GET ALL USER
router.get("/users", getAllUsers);

// UPDATE user status
router.put("/:userId/disable", updateUserStatus);

/*-------------------ORDER-------------------*/
router.put("/orders/:id", updateOrderStatus);

//DELETE an order by ID
router.delete("/orders/:userId", deleteOrder);

// GET recent orders
router.get("/recent-orders", getRecentOrders);

// Get total revenue
router.get("/total-revenue", getTotalRevenue);

// Get this monthly revenue
router.get("/this-month-revenue", getThisMonthRevenue);

// Get today's revenue
router.get("/today-revenue", getTodayRevenue);

// Count Orders By Status
router.get("/count-orders", countOrdersByStatus);

// Get best Selling Products
router.get("/best-selling", getTopSellingProducts);

// Get weekly order
router.get("/weekly-orders", getRecentDailyOrders);

// Get weekly sale
router.get("/weekly-sales", getRecentDailyRevenue);

// Get order by id
router.get("/orders/:orderId", getOrderById);

// Get order by user
router.get("/:userId/orders", getOrdersByUser);

//GET ALL orders
router.get("/orders", getAllOrders);

/*-------------------PRODUCT-------------------*/
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
