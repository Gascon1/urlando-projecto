import { Product } from '../components/product';
import { useContext } from 'react';
import styled from 'styled-components';
import { ProductContext } from '../hooks/product-context';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct } from '../api/delete-product';
import { Header } from '../components/header';
import { Container } from '../components/container';
import { useState } from 'react';

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
  margin: '1em 1em 0',
  textDecoration: 'none',
  transition: 'color 0.1s ease-in-out, background 0.1s ease-in-out',
  '&:hover': {
    color: '#4c4c4e',
    background: '#fff',
  },
});

const SearchBar = styled.input({
  background: 'none',
  borderRadius: '3em',
  color: '#fff',
  cursor: 'pointer',
  padding: '0.5em 1em',
  border: '1px solid #aeaeae',
  fontSize: '1em',
});

const Flex = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '3em',
  margin: '1em 0',
  padding: '0 1em',
});

const StyledButton = styled.button(({ activeBtn }) => ({
  background: 'none',
  borderRadius: '3em',
  color: '#fff',
  cursor: 'pointer',
  padding: '0.5em 1em',
  border: '1px solid #aeaeae',
  fontSize: '1em',
  transition: 'color 0.1s ease-in-out, background 0.1s ease-in-out',

  ...(activeBtn && {
    background: '#fff',
    color: '#4c4c4e',
  }),
}));

const BtnContainer = styled.div({
  display: 'flex',
  gap: '0.5em',
});

export const Products = () => {
  const { products, setProducts } = useContext(ProductContext);
  const nav = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeBtn, setActiveBtn] = useState('scrumMaster');

  const searchResults = products.filter((product) => {
    if (!searchTerm) {
      return product;
    }

    if (activeBtn === 'scrumMaster') {
      return product.scrumMasterName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    } else {
      return product.developers.some((developer) =>
        developer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  const handleOnActiveClick = (activeBtn) => {
    setActiveBtn(activeBtn);
  };

  const productList = searchResults?.map((product) => (
    <Product
      key={product.productId}
      product={product}
      onEdit={onEditClick}
      onDelete={onDeleteClick}
    />
  ));

  return (
    <Container>
      <Header title="Products" count={searchResults.length} />
      <Flex>
        <SearchBar
          type="text"
          placeholder="Search by..."
          value={searchTerm}
          onChange={handleChange}
        />
        <BtnContainer>
          <StyledButton
            activeBtn={activeBtn === 'scrumMaster'}
            onClick={() => {
              handleOnActiveClick('scrumMaster');
            }}
          >
            Scrum Masters
          </StyledButton>
          <StyledButton
            activeBtn={activeBtn === 'developers'}
            onClick={() => {
              handleOnActiveClick('developers');
            }}
          >
            Developers
          </StyledButton>
        </BtnContainer>
      </Flex>
      <StyledLink to="/new-product">Add a new product</StyledLink>
      {products.length > 0 && (
        <ProductsContainer>{productList}</ProductsContainer>
      )}
    </Container>
  );
};
