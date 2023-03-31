import axios from "axios";

export const updateProduct = (product) => {
  return axios.put(
    `http://localhost:3000/api/products/${product.productId}`,
    product
  );
};
