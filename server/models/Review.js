const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    review: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    productId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
