import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import booksAPI from "../api/books";

const initialState = {
  books: [],
  status: "idle",
  error: null,
};

export const retrieveBooks = createAsyncThunk("books/retrieve", async () => {
  const res = await booksAPI.get();
  return res;
});

export const bookSlice = createSlice({
  name: "books",
  initialState,
  extraReducers: {
    [retrieveBooks.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.books = action.payload;
    },
  },
});

export default bookSlice.reducer;
