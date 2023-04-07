const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        name: { type: String },
        image: { type: String },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
        product: { type: Object },
      },
    ],
    subPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
