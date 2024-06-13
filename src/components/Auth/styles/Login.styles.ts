import styled from "styled-components";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f7f7f7;
`;

const LoginContainer = styled.div`
  background-color: #fff;
  width : 400px;
  padding : 20px;
`;


const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  float : right;
  width: 130px;
  padding: 15px;
  margin-top : 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  color: #333;
  color : red;
`;

export { Container, Title, Input, Button, Message , LoginContainer };
