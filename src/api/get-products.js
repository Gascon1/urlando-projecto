import axios from 'axios';

export const getProducts = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/products');

    return res.data;
  } catch (err) {
    console.error(err);

    return [];
  }
};
