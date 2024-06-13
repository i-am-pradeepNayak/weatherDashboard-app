import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { handleModal } from "../../store/slice/weatherSlice";
import { CityItem, CityList, Container } from "./styles/FavoriteCities.styles";

const FavoriteCities: React.FC = () => {
  const weather = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch();

  const handleModalView = (cityId: number) => {
    dispatch(handleModal(cityId));
  };

  return (
    <Container>
      <h3>Favorite Cities</h3>
      <CityList>
        {weather.cityList.length > 0 &&
          weather.cityList.map((city: any) => (
            <CityItem key={city.id} onClick={() => handleModalView(city.id)}>
              {city.cityName}
            </CityItem>
          ))}
      </CityList>
    </Container>
  );
};

export default FavoriteCities;
