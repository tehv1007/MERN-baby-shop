const router = require("express").Router();
const {
  getProductById,
  searchProduct,
  listRelated,
  getCategories,
  getProductsByCategory,
  getTopProducts,
  getRecentlyViewedProducts,
  setRecentlyViewedProducts,
} = require("../controllers/productController");

// GET all products
router.get("/", getProductsByCategory);

// GET top rated products
router.get("/rated", getTopProducts);

// GET product by id
router.get("/:productId", setRecentlyViewedProducts, getProductById);

// Search product
router.get("/search", searchProduct);

// Get categories
router.get("/categories", getCategories);

// Get related products
router.get("/related/:category/:productId", listRelated);

// Get recent viewed products
router.get("/recently-viewed-products", getRecentlyViewedProducts);

module.exports = router;
