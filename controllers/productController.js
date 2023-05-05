const Product = require("../models/Product");

// GET all products
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET product by id
exports.getProductById = async (req, res) => {
  try {
    const selectedItem = await Product.findById({ _id: req.params.productId });
    if (!selectedItem)
      res.json({
        message: `Product with id '${req.params.productId}' not found`,
      });
    res.json(selectedItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Search product
exports.searchProduct = async (req, res) => {
  try {
    const products = await Product.find({
      title: { $regex: req.query.q, $options: "i" },
    });
    res.json({
      products: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// CREATE a new product
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    res.json(updateProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete({
      _id: req.params.productId,
    });
    res.json(deletedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE multiple products
exports.deleteProducts = async (req, res) => {
  try {
    const productIds = req.body.productIds;
    Product.deleteMany({ _id: { $in: productIds } })
      .then(() => res.json({ message: "Deleted successfully" }))
      .catch((err) => res.status(400).json({ message: err.message }));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET all products categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET products of category
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find(req.query);
    res.json({ products: products, total: 100, skip: 0, limit: 30 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET top 4 rated products
exports.getTopProducts = async (req, res) => {
  try {
    const topProducts = await Product.find({}).sort({ avgRating: -1 }).limit(8);
    res.json(topProducts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET related products
exports.listRelated = async (req, res) => {
  try {
    const products = await Product.find({
      _id: { $ne: req.params.productId },
      category: req.params.category,
    }).limit(8);
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllProducts = async (req, res) => {
  // const page = +req.query.page || 1;
  // const category = req.query.category || "all";
  // const totalItems =
  //   category === "all"
  //     ? await Product.find().countDocuments()
  //     : await Product.find({ category: category }).countDocuments();

  // const products =
  //   category === "all"
  //     ? await Product.find()
  //         .skip((page - 1) * ITEMS_PER_PAGE)
  //         .limit(ITEMS_PER_PAGE)
  //     : await Product.find({ category: category })
  //         .skip((page - 1) * ITEMS_PER_PAGE)
  //         .limit(ITEMS_PER_PAGE);
  // // const totalItems = products.length;
  // console.log(totalItems);
  // res.json({
  //   products: products,
  //   page: page,
  //   skip: (page - 1) * ITEMS_PER_PAGE,
  //   limit: ITEMS_PER_PAGE,
  //   total: 100,
  //   currentPage: page,
  //   hasNextPage: ITEMS_PER_PAGE * page < totalItems,
  //   hasPreviousPage: page > 1,
  //   nextPage: page + 1,
  //   previousPage: page - 1,
  //   lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
  // });
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 8;
    const search = req.query.search || "";
    let sort = req.query.sort || "";
    let category = req.query.category || "all";

    const categoryOptions = ["play aids", "toys", "baby care", "baby wear"];

    category === "all"
      ? (category = [...categoryOptions])
      : (category = req.query.category.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const products = await Product.find({
      name: { $regex: search, $options: "i" },
    })
      .where("category")
      .in([...category])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Product.countDocuments({
      category: { $in: [...category] },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      categories: categoryOptions,
      products,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

exports.setRecentlyViewedProducts = async (req, res, next) => {
  try {
    const productId = req.params.productId; // hoặc lấy productId từ query, body tùy theo route
    if (productId) {
      let recentlyViewedProducts = req.cookies.recentlyViewedProducts || [];
      if (!recentlyViewedProducts.includes(productId)) {
        if (recentlyViewedProducts.length >= 6) {
          recentlyViewedProducts.pop(); // nếu số lượng sản phẩm vượt quá 6 thì xóa sản phẩm cũ nhất
        }
        recentlyViewedProducts.unshift(productId); // thêm sản phẩm mới vào đầu mảng
        res.cookie("recentlyViewedProducts", recentlyViewedProducts);
      }
    }
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Route: GET /recently-viewed-products
// Description: Get recently viewed products
exports.getRecentlyViewedProducts = async (req, res) => {
  try {
    let recentlyViewedProducts = req.cookies.recentlyViewedProducts || [];
    // Lấy danh sách sản phẩm dựa vào recentlyViewedProducts
    const products = await Product.find({
      _id: { $in: recentlyViewedProducts },
    });
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
