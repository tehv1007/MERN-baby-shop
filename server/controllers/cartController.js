const Cart = require("../models/Cart");
const Product = require("../models/Product");

//CREATE a cart
exports.addCart = async (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let item = await Product.findOne({ _id: productId });
    if (!item) {
      res.status(404).send("Item not found!");
    }
    const price = item.price;
    const name = item.title;

    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      // Check if product exists or not
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity += quantity;
        cart.products[itemIndex] = productItem;
      } else {
        cart.products.push({ productId, name, quantity, price });
      }
      cart.subPrice += quantity * price;
      cart = await cart.save();
      return res.status(201).json(cart);
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        userId,
        products: [{ productId, name, quantity, price }],
        subPrice: quantity * price,
      });
      return res.status(201).json(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

//DELETE cart by ID
exports.deleteCart = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      cart.subPrice -= productItem.quantity * productItem.price;
      cart.products.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

//GET user cart
exports.getCartByUser = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};
