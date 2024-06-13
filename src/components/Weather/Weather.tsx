import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavCityListData } from "../../store/slice/weatherSlice";
import { RootState, AppDispatch } from "../../store/store";
import { logout } from "../../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";
import FavoriteCities from "./FavoriteCities";
import Modal from "../../Pages/Modal";
import { LogoutButton, Main } from "./styles/Weather.styles";
const { VITE_API_ENDPOINT } = import.meta.env;

const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const weather = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    if (auth.user) dispatch(fetchFavCityListData(auth.user.id));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleAddToFavorite = async () => {
    if (!auth.user) {
      return;
    }
    const newCity = { userId: auth.user.id, cityName: city };

    // Check if the city already exists in the favorite list
    const cityExist = weather.cityList.find(
      (cityData: any) => cityData.cityName.toLowerCase() === city.toLowerCase()
    );

    if (cityExist) {
      console.log("City already exists in the favorite list.");
      return;
    }

    try {
      await axios.post(`${VITE_API_ENDPOINT}/cities`, newCity);
      dispatch(fetchFavCityListData(auth.user.id));
    } catch (e) {
      dispatch({ type: "weather/FavCityList/rejected", payload: e });
    }
  };

  return (
    <>
      <Main>
        {weather.isModalOpen && !weather.cityListLoading && <Modal />}
        <WeatherForecast
          city={city}
          setCity={setCity}
          handleAddToFavorite={handleAddToFavorite}
        />
        <FavoriteCities />
      </Main>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </>
  );
};

export default Weather;
