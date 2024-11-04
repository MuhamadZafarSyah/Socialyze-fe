import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import counterReducer from "./additional/counterSlice";
export const store = configureStore({
  reducer: {
    authState: authSlice,
    counter: counterReducer,
  },
});
