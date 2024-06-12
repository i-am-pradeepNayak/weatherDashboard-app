import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
  condition: '',
  humidity: 0,
  windSpeed: 0,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchWeather.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.temperature = action.payload.main.temp;
      state.condition = action.payload.weather[0].description;
      state.humidity = action.payload.main.humidity;
      state.windSpeed = action.payload.wind.speed;
    });
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default weatherSlice.reducer;
