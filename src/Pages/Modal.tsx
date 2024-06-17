import React, { useEffect } from "react";
import {
  fetchFavCityListData,
  fetchWeather,
  handleModal,
} from "../store/slice/weatherSlice";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Overlay,
  ModalContent,
  CloseButton,
  List,
  RemoveBtn,
} from "./Modal.styles";
const { VITE_API_ENDPOINT } = process.env;

type City = {
  id: string;
  userId: string;
  cityName: string;
};

const Modal: React.FC = () => {
  const weather = useSelector((state: RootState) => state.weather);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const cityData: City | undefined = weather.cityList.find(
      (city: City) => String(city.id) === String(weather.cityId)
    ) as City | undefined;

    if (cityData) {
      dispatch(fetchWeather(cityData.cityName));
    }
  }, []);

  const handleModalClose = () => {
    dispatch(handleModal(null));
  };

  const handleCityRemove = async () => {
    await axios.delete(`${VITE_API_ENDPOINT}/cities/${weather.cityId}`);
    if (auth.user) {
      dispatch(fetchFavCityListData(auth.user.id));
      dispatch(handleModal(null));
    }
  };

  return (
    <Overlay>
      <ModalContent>
        <List>
          <b>Temperature:</b> {weather.weatherData.temperature}°C
        </List>
        <List>
          <b>Condition: </b>
          {weather.weatherData.condition}
        </List>
        <List>
          <b>Humidity: </b>
          {weather.weatherData.humidity}%
        </List>
        <List>
          <b>Wind Speed: </b>
          {weather.weatherData.windSpeed} km/h
        </List>
        <RemoveBtn onClick={() => handleCityRemove()}>
          Remove From WishList
        </RemoveBtn>
        <CloseButton onClick={handleModalClose}>X</CloseButton>
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
