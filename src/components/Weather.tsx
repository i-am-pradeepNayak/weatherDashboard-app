import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavCityListData,
  fetchWeather,
  handleModal,
} from "../store/weatherSlice";
import { RootState, AppDispatch } from "../store/store";
import styled from "styled-components";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../Pages/Modal";

const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const weather = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchFavCityListData(auth.user?.id));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleFetchWeather = () => {
    dispatch(fetchWeather(city));
  };

  const handleAddToFavorite = async () => {
    const newCity = { userId: 1, cityName: city };

    try {
      await axios.post("http://localhost:3001/cities", newCity);
      dispatch(fetchFavCityListData(auth.user?.id));
    } catch (e) {
      console.log(e);
    }
  };

  const handleModalView = (cityId: number) => {
    console.log("cityId",cityId)
    dispatch(handleModal(cityId));
  };

  return (
    <>
      <Main>
        <Container>
          <Title>Weather Forecast</Title>
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <Button onClick={handleFetchWeather}>Get Weather</Button>
          {weather.isModalOpen && <Modal/>}
          {weather.loading && <Message>Loading...</Message>}
          {!weather.loading &&
            !weather.error &&
            !weather.isModalOpen &&
            weather.weatherData.temperature && (
              <>
                <WeatherInfo>
                  <Info>Temperature: {weather.weatherData.temperature}°C</Info>
                  <Info>Condition: {weather.weatherData.condition}</Info>
                  <Info>Humidity: {weather.weatherData.humidity}%</Info>
                  <Info>Wind Speed: {weather.weatherData.windSpeed} km/h</Info>
                  <AddToFavoriteButton onClick={handleAddToFavorite}>
                    Add to favorite
                  </AddToFavoriteButton>
                </WeatherInfo>
              </>
            )}
          {!weather.isModalOpen && weather.error && (
            <Message>{weather.error}</Message>
          )}
        </Container>
        <Container>
          <h3>Favorite Cities</h3>
          <CityList>
            {weather.cityList.length > 0 &&
              weather.cityList.map((city: any) => (
                <CityItem
                  key={city.id}
                  onClick={() => handleModalView(city.id)}
                >
                  {city.cityName}
                </CityItem>
              ))}
          </CityList>
        </Container>
      </Main>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </>
  );
};

export default Weather;

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

const CityList = styled.ul`
  width: 100%;
  height: 65vh;
  list-style: none;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const CityItem = styled.li`
  display: flex;
  gap: 1.6rem;
  align-items: center;

  background-color: var(--color-dark--2);
  border-radius: 7px;
  padding: 1rem 2rem;
  border-left: 5px solid var(--color-brand--2);
  cursor: pointer;

  color: inherit;
  text-decoration: none;
`;
