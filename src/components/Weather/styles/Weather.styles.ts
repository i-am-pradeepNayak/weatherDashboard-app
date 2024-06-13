import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
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
