const router = require("express").Router();
const {
  addCart,
  getCartByUser,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  changeQuantity,
  addToCart,
  deleteCart,
} = require("../controllers/cartController");

//CREATE a cart
router.post("/:userId", addCart);

//DELETE cart by userId
router.delete("/:userId", deleteCart);

//CREATE a cart
router.post("/:userId/add-to-cart/:productId", addToCart);

//GET user cart
router.get("/:userId", getCartByUser);

//Increase quantity of product in cart
router.put("/:userId/increase-quantity/:productId", increaseQuantity);

//Decrease quantity of product in cart
router.put("/:userId/decrease-quantity/:productId", decreaseQuantity);

//Change quantity of product in cart
router.put("/:userId/change-quantity/:productId", changeQuantity);

//Remove product from cart
router.delete("/:userId/remove-from-cart/:productId", removeProductFromCart);

module.exports = router;
