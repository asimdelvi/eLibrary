import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import booksAPI from "../api/books";

const initialState = {
  // when reloading user value will null, so grabbing it from localStorage.
  books: [],
  status: "idle",
  error: null,
};

export const getBooks = createAsyncThunk("books/get", async (thunkAPI) => {
  try {
    console.log(thunkAPI);
    return await booksAPI.get();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createBook = createAsyncThunk(
  "books/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await booksAPI.create(data, token);
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

export const bookSlice = createSlice({
  name: "books",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.status = "fulfilled";
        state.error = null;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(createBook.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.status = "fulfilled";
        state.error = null;
      })
      .addCase(createBook.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
