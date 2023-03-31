const API = import.meta.env.VITE_APP_BASE_URL;
import { v4 as uuidv4 } from "uuid";

export const getBraintreeClientToken = async (userId, token) => {
  try {
    const response = await fetch(`${API}/braintree/getToken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const processPayment = async (userId, token, paymentData) => {
  try {
    const response = await fetch(`${API}/braintree/payment/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const createOrder = async (userId, token, createOrderData) => {
  try {
    const response = await fetch(`${API}/orders/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ order: createOrderData }),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const generateUniqueId = () => {
  const generatedIds = new Set();
  let id = "";
  do {
    id = uuidv4().substr(0, 10);
  } while (generatedIds.has(id));
  generatedIds.add(id);
  return id;
};
