import { createSlice } from "@reduxjs/toolkit";
import { loginAction, registerAction } from "../actions/auth";
import { load, save } from "@/utlis/localStorage";
import { fetchStatus, localStorageKeys } from "@/constants/constants";

const initialState = {
  status: fetchStatus.idle,
  loading: false,
  error: null,
  token: load(localStorageKeys.token, null),
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.status = fetchStatus.pending;
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      save(localStorageKeys.token, action.payload.token);

      state.status = fetchStatus.success;
      state.loading = false;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.status = fetchStatus.error;
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(registerAction.pending, (state) => {
      state.status = fetchStatus.pending;
      state.loading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.status = fetchStatus.success;
      state.loading = false;
      state.token = action.payload.token;
      window.location.href = "/auth/login";
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.status = fetchStatus.error;
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
