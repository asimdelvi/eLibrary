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

export const deleteBook = createAsyncThunk(
  "books/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await booksAPI.remove(id, token);
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

export const updateBook = createAsyncThunk(
  "books/update",
  async (id, data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await booksAPI.update(id, data, token);
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
      })
      .addCase(deleteBook.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter(
          (book) => book.id !== action.payload.id
        );
        state.status = "fulfilled";
        state.error = null;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(updateBook.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const { _id, title, pdfURL } = action.payload;
        const bookToUpdate = state.books.find((book) => book._id === _id);
        if (bookToUpdate) {
          bookToUpdate.title = title;
          bookToUpdate.pdfURL = pdfURL;
        }
        state.status = "fulfilled";
        state.error = null;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
