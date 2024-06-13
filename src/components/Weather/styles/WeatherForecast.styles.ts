import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
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
  width: 100%;
  padding: 15px;
  margin: 20px 0;
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

const WeatherInfo = styled.div`
  margin-top: 20px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const Info = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;

const Message = styled.p`
  color: #333;
  margin-top: 10px;
`;

const AddToFavoriteButton = styled.button`
  width: 20%;
  padding: 10px;
  margin: 10px 0;
  background-color: gray;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export {
  Container,
  Title,
  Input,
  Button,
  WeatherInfo,
  Info,
  Message,
  AddToFavoriteButton,
};
