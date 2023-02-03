import axios from "axios";

export const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

//Get Products by id
export const getProductId = (id) => {
  return axios.get(`products/${id}`);
};
