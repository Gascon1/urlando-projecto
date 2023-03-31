import { useContext } from 'react';
import { ProductContext } from '../hooks/product-context';
import { useParams } from 'react-router-dom';
import { Form } from '../components/form';
import { updateProduct } from '../api/update-product';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/header';
import { Container } from '../components/container';

export const EditProduct = () => {
  const { products, setProducts } = useContext(ProductContext);
  const queryParams = useParams();
  const nav = useNavigate();

  const { productId } = queryParams;
  const product = products.find((product) => product.productId === productId);

  const onSubmit = (updatedProduct) => {
    updateProduct(updatedProduct);

    const newProducts = products.map((product) => {
      if (product.productId === updatedProduct.productId) {
        return updatedProduct;
      }

      return product;
    });

    setProducts(newProducts);
    nav('/');
  };

  return (
    <Container>
      <Header title="Edit Product" />
      {product && <Form product={product} onSubmit={onSubmit} />}
    </Container>
  );
};
