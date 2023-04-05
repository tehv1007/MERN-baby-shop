const router = require("express").Router();
const {
  getProductById,
  searchProduct,
  listRelated,
  getCategories,
  getProductsByCategory,
  getTopProducts,
} = require("../controllers/productController");

// GET all products
router.get("/", getProductsByCategory);

// GET top rated products
router.get("/rated", getTopProducts);

// GET product by id
router.get("/:productId", getProductById);

// Search product
router.get("/search", searchProduct);

// Get categories
router.get("/categories", getCategories);

// Get related products
router.get("/related/:category/:productId", listRelated);

module.exports = router;
