import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/bookSlice";
import authReducer from "../features/authSlice";

export default configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer,
  },
});
