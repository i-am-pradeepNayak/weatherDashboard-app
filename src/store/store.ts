import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import weatherReducer from './slice/weatherSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
