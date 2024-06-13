import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchWeather } from "../../store/slice/weatherSlice";
import {
  Container,
  Title,
  Input,
  Button,
  WeatherInfo,
  Info,
  Message,
  AddToFavoriteButton,
} from "./styles/WeatherForecast.styles";

interface WeatherForecastProps {
  city: string;
  setCity: (city: string) => void;
  handleAddToFavorite: () => void;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  city,
  setCity,
  handleAddToFavorite,
}) => {
  const weather = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch<AppDispatch>();

  const handleFetchWeather = () => {
    dispatch(fetchWeather(city.toLowerCase()));
  };

  return (
    <Container>
      <Title>Weather Forecast</Title>
      <Input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <Button onClick={handleFetchWeather}>Get Weather</Button>

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
                Add to WishList
              </AddToFavoriteButton>
            </WeatherInfo>
          </>
        )}
      {!weather.isModalOpen && weather.error && (
        <Message>{weather.error}</Message>
      )}
    </Container>
  );
};

export default WeatherForecast;
