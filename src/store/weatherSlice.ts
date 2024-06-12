const { VITE_WEATHER_APIKEY } = import.meta.env;
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface WeatherState {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  temperature: 0,
  condition: "",
  humidity: 0,
  windSpeed: 0,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${VITE_WEATHER_APIKEY}&q=${city}&aqi=no`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchWeather.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.temperature = action.payload.current.temp_c;
        state.condition = action.payload.current.condition.text;
        state.humidity = action.payload.current.humidity;
        state.windSpeed = action.payload.current.wind_mph;
      }
    );
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default weatherSlice.reducer;
