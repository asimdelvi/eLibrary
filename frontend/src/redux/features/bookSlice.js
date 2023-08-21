import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import booksAPI from "../api/books";

const initialState = {
  books: [],
  getBooksStatus: "idle",
  getBookStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  error: null,
  selectedBook: {
    _id: 0,
    title: "",
    pdfURL: "",
    createdBy: { _id: 0, username: "" },
  },
};

export const getBooks = createAsyncThunk("books/getAll", async (thunkAPI) => {
  try {
    return await booksAPI.getAll();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getBook = createAsyncThunk(
  "books/getOne",
  async (id, thunkAPI) => {
    try {
      return await booksAPI.get(id);
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
  async (info, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await booksAPI.update(info.id, info.formData, token);
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
        state.getBooksStatus = "pending";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.getBooksStatus = "fulfilled";
        state.error = null;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.getBooksStatus = "rejected";
        state.error = action.payload;
      })
      .addCase(getBook.pending, (state, action) => {
        state.getBookStatus = "pending";
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.selectedBook = action.payload;
        state.getBookStatus = "fulfilled";
        state.error = null;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.getBookStatus = "rejected";
        state.error = action.payload;
      })
      .addCase(createBook.pending, (state, action) => {
        state.createStatus = "pending";
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.createStatus = "fulfilled";
        state.error = null;
      })
      .addCase(createBook.rejected, (state, action) => {
        state.createStatus = "rejected";
        state.error = action.payload;
      })
      .addCase(deleteBook.pending, (state, action) => {
        state.deleteStatus = "pending";
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.deleteStatus = state.books.filter(
          (book) => book.id !== action.payload.id
        );
        state.deleteStatus = "fulfilled";
        state.error = null;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.deleteStatus = "rejected";
        state.error = action.payload;
      })
      .addCase(updateBook.pending, (state, action) => {
        state.updateStatus = "pending";
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.selectedBook = action.payload;
        state.updateStatus = "fulfilled";
        state.error = null;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.updateStatus = "rejected";
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
