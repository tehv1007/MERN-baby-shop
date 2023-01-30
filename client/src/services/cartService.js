import { useQuery } from "@tanstack/react-query";
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

export const addItemToCart = async (user, quantity, product) => {
  const cart = await axios.post(`/cart/${user._id}`, {
    quantity: quantity,
    productId: product._id,
  });
  console.log(cart);
};

export const removeCartItem = async (user, product) => {
  const cart = await axios.delete(`/cart/${user._id}/${product._id}`);
  console.log(cart);
};

export const updateCartItem = async (user, product, quantity) => {
  const cart = await axios.put(`/cart/${user._id}/${product._id}`, {
    quantity: quantity,
  });
  console.log(cart);
};

export const emptyCart = async (user) => {
  const cart = await axios.delete(`/cart/${user._id}`);
  console.log(cart);
};
// Another way to handle cart
/*
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

export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};

export const emptyCart = (next) => {
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
*/
