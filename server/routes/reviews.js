const router = require("express").Router();
const {
  getReviewById,
  deleteReview,
  editReview,
  addReviewProduct,
} = require("../controllers/reviewController");

router.post("/:productId/:userId", addReviewProduct);

router.get("/:productId", getReviewById);

router.delete("/:productId/:reviewId", deleteReview);

router.put("/:productId/:reviewId", editReview);

module.exports = router;
