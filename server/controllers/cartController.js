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
    const image = item.photos[0];
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
        cart.products.push({
          productId,
          quantity,
          price,
          name,
          image,
          product: item,
        });
      }
      cart.subPrice += quantity * price;
      cart = await cart.save();
      return res.status(201).json(cart);
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity, price, product: item }],
        subPrice: quantity * price || 0,
      });
      return res.status(201).json(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

// Delete all items in the cart
exports.deleteCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    let cart = await Cart.findOne({ userId });
    let length = cart.products.length;

    cart.subPrice = 0;
    cart.products.splice(0, length);
    updatedCart = await cart.save();
    return res.status(201).json(updatedCart);
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

// Route: POST /api/cart/add-to-cart/:productId
// Description: Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, products: [] });
    }

    // Check if the product already exists in the cart
    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() == productId
    );

    if (existingProductIndex != -1) {
      // Increase the quantity if the product already exists
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to cart
      const newProduct = {
        productId: product._id,
        name: product.title,
        image: product.photos[0],
        quantity: quantity,
        price: product.price,
        product: product,
      };
      cart.products.push(newProduct);
    }

    // Calculate the subtotal price of the cart
    cart.subPrice = cart.products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Route: PUT /api/cart/decrease-quantity/:productId
// Description: Decrease quantity of product in cart
exports.decreaseQuantity = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex == -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const product = cart.products[productIndex];

    if (product.quantity == 1) {
      // Remove the product if the quantity is 1
      cart.products.splice(productIndex, 1);
    } else {
      // Decrease the quantity of the product by 1
      cart.products[productIndex].quantity -= 1;
    }

    // Calculate the subtotal price of the cart
    cart.subPrice = cart.products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Route: DELETE /api/cart/remove-from-cart/:productId
// Description: Remove product from cart
exports.removeProductFromCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the product to remove
    const productIndex = cart.products.findIndex(
      (product) => product.productId == productId
    );

    // If the product is not found, return error
    if (productIndex == -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Remove the product from the cart
    const removedProduct = cart.products.splice(productIndex, 1);

    // Recalculate the subPrice of the cart
    cart.subPrice -= removedProduct[0].price * removedProduct[0].quantity;

    await cart.save();

    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

// Route: PUT /api/cart/increase-quantity/:productId
// Description: Increase quantity of product in cart
exports.increaseQuantity = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex == -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const product = cart.products[productIndex];

    // Increase the quantity of the product by 1
    cart.products[productIndex].quantity += 1;

    // Calculate the subtotal price of the cart
    cart.subPrice = cart.products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Route: PUT /api/cart/change-quantity/:productId
// Description: Change quantity of product in cart
exports.changeQuantity = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { quantity } = req.body; // Lấy giá trị số lượng từ request body

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Tìm sản phẩm trong giỏ hàng dựa trên id
    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() == productId
    );

    if (productIndex == -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Thay đổi số lượng sản phẩm dựa trên giá trị nhập vào từ client
    cart.products[productIndex].quantity = quantity;

    // Tính toán lại giá tiền của giỏ hàng
    cart.subPrice = cart.products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
