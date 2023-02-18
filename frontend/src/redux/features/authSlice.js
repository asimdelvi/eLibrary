import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../api/auth";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  // when reloading user value will null, so grabbing it from localStorage.
  user: user ? user : null,
  status: "idle",
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authAPI.register(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authAPI.login(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "fulfilled";
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "fulfilled";
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
