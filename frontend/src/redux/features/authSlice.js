import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../api/auth";

const initialState = {
  user: null,
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.pending]: (state, action) => {
      state.status = "pending";
    },
    [register.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "fulfilled";
    },
    [register.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
