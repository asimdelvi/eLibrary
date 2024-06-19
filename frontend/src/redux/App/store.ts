import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/bookSlice";
import authReducer from "../features/authSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
