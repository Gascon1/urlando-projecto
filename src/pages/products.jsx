import { Product } from '../components/product';
import { useContext } from 'react';
import styled from 'styled-components';
import { ProductContext } from '../hooks/product-context';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct } from '../api/delete-product';
import { Header } from '../components/header';
import { Container } from '../components/container';

const ProductsContainer = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  padding: '1em',
  gap: '1em',
  maxWidth: '600px',
});

const StyledLink = styled(Link)({
  width: 'fit-content',
  background: 'none',
  borderRadius: '3em',
  color: '#fff',
  cursor: 'pointer',
  padding: '0.5em 1em',
  border: '1px solid #aeaeae',
  margin: '1em',
  textDecoration: 'none',
  transition: 'color 0.1s ease-in-out, background 0.1s ease-in-out',
  '&:hover': {
    color: '#4c4c4e',
    background: '#fff',
  },
});

export const Products = () => {
  const { products, setProducts } = useContext(ProductContext);

  const nav = useNavigate();

  const onEditClick = (productId) => {
    nav(`/edit-product/${productId}`);
  };

  const onDeleteClick = (deletedProductId) => {
    deleteProduct(deletedProductId);

    const newProducts = products.filter(
      (product) => product.productId !== deletedProductId
    );

    setProducts(newProducts);
  };

  const productList = products?.map((product) => (
    <Product
      key={product.productId}
      product={product}
      onEdit={onEditClick}
      onDelete={onDeleteClick}
    />
  ));

  return (
    <Container>
      <Header title="Products" count={products.length} />
      <StyledLink to="/new-product">Add a new product</StyledLink>
      {products.length > 0 && (
        <ProductsContainer>{productList}</ProductsContainer>
      )}
    </Container>
  );
};
