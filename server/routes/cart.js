const router = require("express").Router();
const {
  addCart,
  deleteCart,
  getCartByUser,
} = require("../controllers/cartController");

//CREATE a cart
router.post("/:userId", addCart);

//DELETE cart by ID
router.delete("/:userId/:productId", deleteCart);

//GET user cart
router.get("/:userId", getCartByUser);

module.exports = router;
