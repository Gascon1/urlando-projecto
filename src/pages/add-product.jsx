import styled from "styled-components";
import { addProduct } from "../api/add-product";
import { Form } from "../components/form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../hooks/product-context";

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

const getRandomNumber = () => Math.floor(Math.random() * 100_000);

export const AddProduct = () => {
  const { setProducts } = useContext(ProductContext);
  const product = {
    productId: getRandomNumber(),
    productName: "",
    productOwnerName: "",
    scrumMasterName: "",
    startDate: "",
    developers: [],
    methodology: "",
  };

  const nav = useNavigate();

  const onSubmit = (product) => {
    console.log(product);

    addProduct(product);

    setProducts((products) => [...products, product]);

    nav("/");
  };

  return (
    <Container>
      <Header>
        <Heading>Add Product</Heading>
      </Header>
      {product && <Form product={product} onSubmit={onSubmit} />}
    </Container>
  );
};
