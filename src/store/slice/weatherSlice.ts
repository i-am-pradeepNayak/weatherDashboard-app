const { VITE_WEATHER_APIKEY, VITE_API_ENDPOINT } = import.meta.env;
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface weatherData {
  temperature: number | null;
  condition: string;
  humidity: number | null;
  windSpeed: number | null;
}

interface WeatherState {
  weatherData: weatherData;
  loading: boolean;
  error: string | null;
  cityList: [];
  cityListLoading: boolean;
  isModalOpen: boolean;
  cityId: number | null;
}

const initialState: WeatherState = {
  weatherData: {
    temperature: null,
    condition: "",
    humidity: null,
    windSpeed: null,
  },
  cityList: [],
  cityListLoading: false,
  isModalOpen: false,
  cityId: null,
  loading: false,
  error: null,
};




export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city: string, { rejectWithValue }) => {
    try {
      if (city === "")
        return rejectWithValue(
          "Please enter a city name to get weather info😊"
        );
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${VITE_WEATHER_APIKEY}&q=${city}&aqi=no`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const fetchFavCityListData = createAsyncThunk(
  "weather/FavCityList",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${VITE_API_ENDPOINT}/cities`, {
        params: {
          userId,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

interface Item {
  cityId: number | null;
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    handleModal: {
      reducer: (state, action: PayloadAction<Item>) => {
        state.isModalOpen = !state.isModalOpen;
        state.cityId = action.payload.cityId;
        state.weatherData = {
          temperature: null,
          condition: "",
          humidity: null,
          windSpeed: null,
        };
      },
      prepare: (cityId: number | null) => {
        return { payload: { cityId } };
      },
    },
  },
  //weather
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchWeather.fulfilled,
      (state, action: PayloadAction<any>) => {
        const { current } = action.payload;
        state.loading = false;
        state.weatherData = {
          temperature: current.temp_c,
          condition: current.condition.text,
          humidity: current.humidity,
          windSpeed: current.wind_kph,
        };
      }
    );
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //favorite city
    builder.addCase(fetchFavCityListData.pending, (state) => {
      state.cityListLoading = true;
      state.error = null;
    });

    builder.addCase(
      fetchFavCityListData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.cityListLoading = false;
        state.cityList = action.payload;
      }
    );

    //favorite city
    builder.addCase(fetchFavCityListData.rejected, (state) => {
      state.cityListLoading = false;
    });
  },
});

export const { handleModal } = weatherSlice.actions;
export default weatherSlice.reducer;
