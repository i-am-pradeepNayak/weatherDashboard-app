import React, { useEffect } from "react";
import styled from "styled-components";
import {
  fetchFavCityListData,
  fetchWeather,
  handleModal,
} from "../store/slice/weatherSlice";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Modal: React.FC = () => {
  const weather = useSelector((state: RootState) => state.weather);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const cityData: any = weather.cityList.find(
      (city: { id: number }) => city.id === weather.cityId
    );
    dispatch(fetchWeather(cityData.cityName));
  }, []);

  const handleModalClose = () => {
    dispatch(handleModal(null));
  };

  const handleCityRemove = async () => {
    await axios.delete(`http://localhost:3001/cities/${weather.cityId}`);
    if (auth.user) {
      dispatch(fetchFavCityListData(auth.user?.id));
      dispatch(handleModal(null));
    }
  };

  return (
    <Overlay>
      <ModalContent>
        <p>Temperature: {weather.weatherData.temperature}°C</p>
        <p>Condition: {weather.weatherData.condition}</p>
        <p>Humidity: {weather.weatherData.humidity}%</p>
        <p>Wind Speed: {weather.weatherData.windSpeed} km/h</p>
        <button onClick={() => handleCityRemove()}>Remove From WishList</button>
        <CloseButton onClick={handleModalClose}>X</CloseButton>
      </ModalContent>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 80%;
  max-width: 500px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;
