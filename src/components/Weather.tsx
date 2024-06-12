import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/weatherSlice";
import { RootState, AppDispatch } from "../store/store";
import styled from "styled-components";
import { toast } from "react-toastify";
import { logout } from "../store/authSlice";

const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const weather = useSelector((state: RootState) => state.weather);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleFetchWeather = () => {
    dispatch(fetchWeather(city)).then(() => {
      if (weather.error) {
        toast.error(weather.error);
      }
    });
  };

  return (
    <>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <Container>
        <Title>Weather Forecast</Title>
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <Button onClick={handleFetchWeather}>Get Weather</Button>
        {weather.loading && <Message>Loading...</Message>}
        {!weather.loading && !weather.error && (
          <WeatherInfo>
            <Info>Temperature: {weather.temperature}K</Info>
            <Info>Condition: {weather.condition}</Info>
            <Info>Humidity: {weather.humidity}%</Info>
            <Info>Wind Speed: {weather.windSpeed} m/s</Info>
          </WeatherInfo>
        )}
      </Container>
    </>
  );
};

export default Weather;

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
