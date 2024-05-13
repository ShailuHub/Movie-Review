import { configureStore } from "@reduxjs/toolkit";
import authslice from "../features/authslice";

const store = configureStore({
  reducer: {
    auth: authslice.reducer,
  },
});

export const authAction = authslice.actions;

export default store;
