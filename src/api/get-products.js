import axios from 'axios';

export const getProducts = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/products');
    const data = res.data;

    return data;
  } catch (err) {
    console.error(err);

    return [];
  }
};
