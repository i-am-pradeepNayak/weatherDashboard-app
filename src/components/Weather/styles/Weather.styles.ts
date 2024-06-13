import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  
  padding: 20px;
  border-radius: 10px;
  
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  gap : 20px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: Blue;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export { Main, LogoutButton };
