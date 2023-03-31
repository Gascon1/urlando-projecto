import { addProduct } from '../api/add-product';
import { Form } from '../components/form';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../hooks/product-context';
import { Header } from '../components/header';
import { Container } from '../components/container';

const getRandomNumber = () => Math.floor(Math.random() * 100_000);

export const AddProduct = () => {
  const { setProducts } = useContext(ProductContext);
  const product = {
    productId: getRandomNumber().toString(),
    productName: '',
    productOwnerName: '',
    scrumMasterName: '',
    startDate: '',
    developers: [''],
    methodology: '',
  };

  const nav = useNavigate();

  const onSubmit = async (product) => {
    const newProduct = await addProduct(product);

    // use newProduct instead of product once backend change is done
    setProducts((products) => [...products, product]);

    nav('/');
  };

  return (
    <Container>
      <Header title="Add Product" />
      {product && <Form product={product} onSubmit={onSubmit} />}
    </Container>
  );
};
