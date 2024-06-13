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
  padding: 10px 15px;
  margin: 10px 0px;
  background-color:#DC143C;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;`

export { Main, LogoutButton };
