const router = require("express").Router();
const {
  getCategoriesByCollection,
  updateCategory,
  deleteCategory,
  addCategory,
  getAllCategoryNames,
  getAllCategories,
  getProductsByCategoryCollection,
  getCategoryById,
} = require("../controllers/categoryController");

// Get all category names
router.get("/names", getAllCategoryNames);

// GET a category by ID
router.get("/:categoryId", getCategoryById);

// UPDATE a category by ID
router.put("/:categoryId", updateCategory);

// DELETE category by ID
router.delete("/:categoryId", deleteCategory);

// Get Categories By Collection
router.get("/:collectionName", getCategoriesByCollection);

// Get Categories By Collection
router.get("/products/:collectionName", getProductsByCategoryCollection);

// CREATE a new category
router.post("/new", addCategory);

// Get all category names
router.get("/", getAllCategories);

module.exports = router;
