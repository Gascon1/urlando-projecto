import styled from "styled-components";
import { useContext } from "react";
import { ProductContext } from "../hooks/product-context";
import { useParams } from "react-router-dom";
import { Form } from "../components/form";
import { updateProduct } from "../api/update-product";
import { useNavigate } from "react-router-dom";

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

export const EditProduct = () => {
  const { products, setProducts } = useContext(ProductContext);
  const queryParams = useParams();

  const { productId } = queryParams;

  const product = products.find((product) => product.productId === productId);

  const nav = useNavigate();

  const onSubmit = (updatedProduct) => {
    console.log(updatedProduct);

    updateProduct(updatedProduct);

    const newProducts = products.map((product) => {
      if (product.productId === updatedProduct.productId) {
        return updatedProduct;
      }

      return product;
    });

    setProducts(newProducts);

    nav("/");
  };

  return (
    <Container>
      <Header>
        <Heading>Edit Product</Heading>
      </Header>
      {product && <Form product={product} onSubmit={onSubmit} />}
    </Container>
  );
};
