import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: null,
  formErrorMessage: {
    emailError: null,
    passwordError: null,
  },
  responseMessage: {
    error: null,
    message: null,
  },
};

const authslice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    addUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    addFromErrorMessage: (state, action) => {
      state.formErrorMessage.emailError = action.payload.emailError;
      state.formErrorMessage.passwordError = action.payload.passwordError;
    },
    addResponseMessage: (state, action) => {
      state.responseMessage.error = action.payload.error;
      state.responseMessage.message = action.payload.message;
    },
  },
});

export const { addUserToken, addFromErrorMessage, addResponseMessage } =
  authslice.actions;
export default authslice;
