import axios from "axios";

export const deleteProduct = (productId) => {
  axios.delete(`http://localhost:3000/api/products/${productId}`);
};
