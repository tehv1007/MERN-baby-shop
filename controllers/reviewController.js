const Review = require("../models/Review");
const Product = require("../models/Product");

// Get all reviews at one product
exports.getReviewByProductId = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort(
      {
        createdAt: "desc",
      }
    );
    if (!reviews) return res.status(404).json({ message: "No review found." });
    // Render the reviews in the UI
    res.json({
      reviews: reviews.map((review) => {
        const editWindow = 7 * 24 * 60 * 60 * 1000; // 7 day in milliseconds
        const now = new Date();
        const createdAt = new Date(review.createdAt);
        const canEdit = now - createdAt < editWindow;

        return {
          id: review._id,
          userId: review.userId,
          user: review.user,
          productId: review.productId,
          rating: review.rating,
          content: review.review[0].content,
          title: review.review[0].title,
          createdAt: review.createdAt,
          canEdit: canEdit,
        };
      }),
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await review.findByIdAndRemove(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "No review found." });
    res.status(200).json({ review });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Edit review
exports.editReview = async (req, res) => {
  try {
    // Find the review in the database
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the review can still be edited (within 7 day of creation)
    const editWindow = 7 * 24 * 60 * 60 * 1000; // 7 day in milliseconds
    const now = new Date();
    const createdAt = new Date(review.createdAt);
    if (now - createdAt > editWindow) {
      return res.status(403).json({ message: "Edit window has expired" });
    }

    // Update the review
    review.rating = req.body.rating;
    review.review = req.body.content;
    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Add review to a product
exports.addReviewProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.params.userId;
    const product = await Product.findById(productId);

    // Check if the user has already reviewed the product
    const existingReview = await Review.findOne({ userId, productId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    if (product) {
      // Create a new review
      let review = await Review.create(req.body);

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.avgRating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;

      const updatedProduct = await product.save();
      res.status(201).json({
        message: "Review Created",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Get review by reviewId
exports.getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
