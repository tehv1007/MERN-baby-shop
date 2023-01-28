const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
          unique: true,
        },
        name: { type: String },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
      },
    ],
    totalPrice: { type: Number, required: true, default: 0 },
    address: { type: Object, required: true },
    paymentMethod: { type: String, required: true, default: "COD" },
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ], // enum means string objects
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
