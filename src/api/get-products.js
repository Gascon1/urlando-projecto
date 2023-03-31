import axios from 'axios';

export const getProducts = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/products');

    if (res.ok) {
      const data = await res.json();

      return data;
    } else {
      throw new Error('Something went wrong');
    }
  } catch (err) {
    console.error(err);

    return [];
  }
};
