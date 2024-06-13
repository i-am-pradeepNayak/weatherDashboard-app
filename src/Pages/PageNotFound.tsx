import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <>
      <Title>Page not found 😢</Title>
      <StyledLink to="/">Go back to Home</StyledLink>
    </>
  );
};

export default PageNotFound;



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
