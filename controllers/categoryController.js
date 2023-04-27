const Category = require("../models/Category");
const Product = require("../models/Product");

// Route: GET /categories
// Description: Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Route: GET /categories/:categoryId
// Description: Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Route: GET /categories/names
// Description: Get all category names
exports.getAllCategoryNames = async (req, res) => {
  try {
    const categoryNames = await Category.find({}, { title: 1, _id: 0 });
    return res.status(200).json(categoryNames.map((c) => c.title));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Route: GET /categories/:collectionName
// Description: Get all categories of a specific collection
exports.getCategoriesByCollection = async (req, res) => {
  try {
    const collectionName = req.params.collectionName;

    const categories = await Category.find(
      { collections: collectionName },
      { title: 1, _id: 0 }
    );

    return res.status(200).json(categories.map((c) => c.title));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Route: PUT /categories/:categoryId
// Description: Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const update = req.body;

    const category = await Category.findByIdAndUpdate(categoryId, update, {
      new: true,
    });

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Route: PUT /categories/:categoryId
// Description: Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    await Category.findByIdAndRemove(categoryId);

    res.json({ message: "Category deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Route: POST /categories/new
// Description: Add a new category
exports.addCategory = async (req, res) => {
  try {
    // Get data from request body
    const { title, collections, imageUrl } = req.body;

    // Check if category with this name already exists
    const existingCategory = await Category.findOne({ title });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create a new category object
    const newCategory = new Category({
      title,
      collections,
      imageUrl,
    });

    // Save the new category to database
    const savedCategory = await newCategory.save();

    return res.status(201).json({
      message: "Category added successfully",
      category: savedCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Route: GET /products/:collectionName
// Description: Get all products by category collection name
exports.getProductsByCategoryCollection = async (req, res) => {
  const { collectionName } = req.params;

  try {
    // Tìm các category chứa collectionName
    const categories = await Category.find({ collections: collectionName });

    // Lấy ra các id của các category vừa tìm được
    const categoryNames = categories.map((category) => category.title);

    // Tìm các sản phẩm thuộc các category đã tìm được
    const products = await Product.find({ category: { $in: categoryNames } });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
