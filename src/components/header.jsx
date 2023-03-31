import styled from 'styled-components';

const Container = styled.header({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1em',
});

const Heading = styled.h1({
  fontSize: '3em',
});

export const Header = (props) => {
  const { title, count } = props;

  return (
    <Container>
      <Heading>{title}</Heading>
      {!!count && <span>{count}</span>}
    </Container>
  );
};
