const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
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
    bill: { type: Number, required: true, default: 0 },
    address: { type: Object, required: true },
    paymentMethod: { type: String, required: true, default: "COD" },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
