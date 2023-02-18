import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import booksAPI from "../api/books";

const initialState = {
  // when reloading user value will null, so grabbing it from localStorage.
  books: [],
  status: "idle",
  error: null,
};

export const getBooks = createAsyncThunk(
  "books/get",
  async (userData, thunkAPI) => {
    try {
      return await booksAPI.get();
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

// export const login = createAsyncThunk(
//   "auth/login",
//   async (userData, thunkAPI) => {
//     try {
//       return await authAPI.login(userData);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const bookSlice = createSlice({
  name: "books",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.status = "fulfilled";
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
