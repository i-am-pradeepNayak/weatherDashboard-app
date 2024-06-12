import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <Container>
      <Title>Page not found 😢</Title>
      <StyledLink to="/">Go back to Home</StyledLink>
    </Container>
  );
};

export default PageNotFound;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  color: #333;
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
