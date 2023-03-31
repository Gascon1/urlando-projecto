import { Product } from "../components/product";
import { useContext } from "react";
import styled from "styled-components";
import { ProductContext } from "../hooks/product-context";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct } from "../api/delete-product";

const ProductsContainer = styled.div({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  padding: "1em",
  gap: "1em",
  maxWidth: "600px",
});

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  // alignItems: "center",
  padding: "1em",
});

const Heading = styled.h1({
  fontSize: "3em",
});

const Header = styled.header({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 1em",
});

const StyledLink = styled(Link)({
  width: "fit-content",
  background: "none",
  borderRadius: "3em",
  color: "#fff",
  cursor: "pointer",
  padding: "0.5em 1em",
  border: "1px solid #aeaeae",
  margin: "1em",
  textDecoration: "none",
  transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
  "&:hover": {
    color: "#4c4c4e",
    background: "#fff",
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
      <Header>
        <Heading>Products</Heading>
        <span>{products.length}</span>
      </Header>
      <StyledLink to="/new-product">Add a new product</StyledLink>
      {products && <ProductsContainer>{productList}</ProductsContainer>}
    </Container>
  );
};
