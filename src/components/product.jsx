import styled from 'styled-components';
import { Developer } from './developer';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5em',
  flexWrap: 'wrap',
  borderRadius: '0.3em',
  overflow: 'hidden',
  background: '#3c3c3e',
  justifyContent: 'space-between',
  padding: '1em 0',
  border: '1px solid #aeaeae',
  minWidth: '300px',
});

const Develoepers = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5em',
  padding: '0 1em',
  alignItems: 'center',
});

const Item = styled.span({
  padding: '0 1em',
});

const Header = styled.header({
  display: 'flex',
  padding: '0 1em 1em',
  textTransform: 'capitalize',
  borderBottom: '1px solid #aeaeae',
});

const ButtonContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1em',
  padding: '0 1em',
});

const Button = styled.button({
  padding: '0.5em 1em',
  borderRadius: '0.5em',
  border: '1px solid #aeaeae',
  background: '#3c3c3e',
  color: '#fff',
  cursor: 'pointer',
  flex: '1',
  transition: 'background 0.1s ease-in-out, color 0.1s ease-in-out',
  '&:hover': {
    background: '#fff',
    color: '#3c3c3e',
  },
});

const ProductInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5em',
  padding: '0.5em 0',
});

export const Product = (props) => {
  const { product, onEdit, onDelete } = props;
  const {
    productId,
    productName,
    scrumMasterName,
    productOwnerName,
    developers,
    startDate,
    methodology,
  } = product;

  const developerList = developers?.map((developer, i) => (
    <Developer key={`developer-${i}`} className="developer">
      {developer}
    </Developer>
  ));

  return (
    <Container>
      <Header>
        <h1 className="product-name">{productName}</h1>
      </Header>
      <ProductInfo>
        <Item className="product-id">Product ID: {productId}</Item>
        <Item className="scrum-master">Scrum master: {scrumMasterName}</Item>
        <Item className="product-owner">Product Owner: {productOwnerName}</Item>
        <Develoepers className="developers">
          Developers: {developerList}
        </Develoepers>
        <Item className="start-date">Start date: {startDate}</Item>
        <Item className="methodology">Methodology: {methodology}</Item>
      </ProductInfo>
      <ButtonContainer>
        <Button onClick={() => onEdit(productId)}>Edit</Button>
        <Button onClick={() => onDelete(productId)}>Delete</Button>
      </ButtonContainer>
    </Container>
  );
};
