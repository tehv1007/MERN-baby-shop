import axios from "axios";

export const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

//Get Products by id
export const getProductById = (productId) => {
  return axios.get(`/products/${productId}`);
};

export const getProducts = () => {
  return axios.get("/products");
};

export const searchProducts = (query) => {
  return axios.get("/products/search", { params: { q: query } });
};

export const createProduct = (data) => {
  return axios.post("/admin/products/new", data);
};

export const updateProductById = (id, data) => {
  return axios.put(`/admin/products/${id}`, data);
};

export const deleteProductById = (id) => {
  return axios.delete(`/admin/products/${id}`);
};
export const deleteMultiProduct = (selectedProducts) => {
  return axios.delete(`/admin/products`, {
    data: { productIds: selectedProducts.map((p) => p._id) },
  });
};
