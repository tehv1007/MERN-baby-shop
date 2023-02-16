const Review = require("../models/Review");
const Product = require("../models/Product");

// Get all reviews at one product
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.find({ productId: req.params.productId }).sort({
      createdAt: "desc",
    });
    if (!review) return res.status(404).json({ message: "No review found." });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await review.findByIdAndRemove(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "No review found." });
    res.status(200).json({ review });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

exports.editReview = async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let review = await Review.findByIdAndUpdate(
      req.params.reviewId,
      { text: req.body.text, user: tempReview.user.id },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "No message found." });
    review = await review.populate("user").execPopulate();

    res.status(200).json({ review });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Add review to a product
exports.addReviewProduct = async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  console.log(product);
  if (product) {
    if (product.reviews.find((x) => x.userId == req.params.userId)) {
      return res
        .status(400)
        .send({ message: "You already submitted a review" });
    }
    let review = await Review.create(req.body);

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.avgRating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      message: "Review Created",
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
    });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};
