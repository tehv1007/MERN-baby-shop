const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    photos: { type: [String] },
    size: { type: [Number] },
    colors: { type: [String] },
    reviews: [
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
    ],
    styles: { type: [String] },
    avgRating: { type: Number, min: 0, max: 5, default: 0, ref: "Review" },
    numReviews: { type: Number, default: 0 },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    sold: { type: Number, default: 0 },
    inStock: { type: Number, default: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
