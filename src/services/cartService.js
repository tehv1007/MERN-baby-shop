import axios from "axios";

export const getTotalPrice = (items) => {
  return items.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.quantity * nextValue.price;
  }, 0);
};

export const getTotalQuantity = (items) => {
  return items.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.quantity;
  }, 0);
};

//ok
export const addItemToCart = async (user, quantity, product) => {
  return await axios.post(`/cart/${user._id}`, {
    quantity: quantity,
    productId: product._id,
  });
};

//ok
export const removeCartItem = async (user, product) => {
  return await axios.delete(`/cart/${user._id}/${product._id}`);
};

export const updateCartItem = async (user, product, quantity) => {
  return await axios.put(`/cart/${user._id}/${product._id}`, {
    quantity: quantity,
  });
};

export const emptyCart = async (user) => {
  return await axios.delete(`/cart/${user._id}`);
};

/*-----------------------------------------------------------------------*/
// handle cart with local storage
export const addItem = (item, quantity = 1, next = (f) => f) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      const found = cart.find((p) => p._id === item._id);
      if (found !== undefined) found.count += Number(quantity);
    }
    cart.push({
      ...item,
      count: 1,
    });

    // remove duplicates
    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      return cart.find((p) => p._id === id);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

// export const itemTotal = () => {
//   if (typeof window !== "undefined") {
//     if (localStorage.getItem("cart")) {
//       return JSON.parse(localStorage.getItem("cart")).length;
//     }
//   }
//   return 0;
// };

export const emptyCartLocal = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    next();
  }
};

export const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return [];
};

export const updateItem = (productId, count) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === productId) {
        cart[i].count += Number(count);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeItem = (productId) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};
