const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    products: [
      {
        productId: { type: String },
        name: { type: String },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
      },
    ],
    totalPrice: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
