import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../api/auth";
import type { AuthState, LoginInput, RegisterInput, User } from "../../types";

const user = JSON.parse(localStorage.getItem("user") || "null");

const initialState: AuthState = {
  // when reloading user value will null, so grabbing it from localStorage.
  user: user ? user : null,
  status: "idle",
  error: null,
};

export const register = createAsyncThunk<User, RegisterInput>(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authAPI.register(userData);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk<User, LoginInput>(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authAPI.login(userData);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
