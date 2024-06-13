import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface AuthState { // Ensure this is exported
  isAuthenticated: boolean;
  user: { id: number; username: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    if (!username) {
      return rejectWithValue('Username cannot be empty');
    }

    if (!password) {
      return rejectWithValue('Password cannot be empty');
    }

    try {
      const response = await axios.get('http://localhost:3001/users', {
        params: {
          username,
          password,
        },
      });
      if (response.data.length > 0) {
        const user = response.data[0];
        if (user.password === password) {
          return user;
        } else {
          return rejectWithValue('Invalid password');
        }
      } else {
        return rejectWithValue('User not found');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = { id: action.payload.id, username: action.payload.username };
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
