import axios from "axios";

export const addProduct = (product) => {
  return axios.post("http://localhost:3000/api/products", product);
};
