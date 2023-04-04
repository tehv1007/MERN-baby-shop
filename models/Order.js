const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    transaction_id: { type: String, unique: true },
    // userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    userId: { type: String, required: true, ref: "User" },
    products: [
      {
        // productId: { type: Schema.Types.ObjectId, ref: "Product" },
        productId: { type: String, ref: "Product" },
        name: { type: String },
        image: { type: String },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
    amount: { type: Number, default: 0 },
    address: { type: String },
    paymentMethod: { type: String },
    phoneNumber: { type: String },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
