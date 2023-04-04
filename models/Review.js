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
    // productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    productId: { type: String, required: true, ref: "Product" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    user: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
