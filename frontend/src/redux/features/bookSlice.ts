import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import booksAPI from "../api/books";
import type { RootState } from "../App/store";
import type { Book, BookState } from "../../types";

const initialState: BookState = {
  books: [],
  getBooksStatus: "idle",
  getBookStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  error: null,
  selectedBook: {
    _id: "0",
    title: "",
    pdfURL: "",
    publicID: "",
    createdBy: { _id: "0", username: "" },
  },
};

export const getBooks = createAsyncThunk(
  "books/getAll",
  async (_, thunkAPI) => {
    try {
      return await booksAPI.getAll();
    } catch (error: any) {
      const message: string =
        error?.response?.data?.message || error?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBook = createAsyncThunk<Book, string>(
  "books/getOne",
  async (id, thunkAPI) => {
    try {
      return await booksAPI.get(id);
    } catch (error: any) {
      const message: string =
        error?.response?.data?.message || error?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createBook = createAsyncThunk<
  Book,
  FormData,
  { state: RootState }
>("books/create", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth?.user?.token;
    return await booksAPI.create(data, token as string);
  } catch (error: any) {
    const message: string =
      error?.response?.data?.message || error?.message || error?.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteBook = createAsyncThunk<Book, string, { state: RootState }>(
  "books/delete",
  async (_id, thunkAPI) => {
    try {
      const token = thunkAPI?.getState().auth?.user?.token;
      return await booksAPI.remove(_id, token as string);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateBook = createAsyncThunk<
  Book,
  { id: string; formData: FormData },
  { state: RootState }
>("books/update", async (info, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth?.user?.token;
    return await booksAPI.update(info.id, info.formData, token as string);
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || error?.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      })
      .addCase(deleteBook.pending, (state, action) => {
        state.deleteStatus = "pending";
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books.filter((book) => book._id !== action.payload._id);
        state.deleteStatus = "fulfilled";
        state.error = null;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.deleteStatus = "rejected";
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      });
  },
});

export default bookSlice.reducer;
