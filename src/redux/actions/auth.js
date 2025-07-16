import { VITE_API_BASE_URL } from "@/utlis/env";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { localStorageKeys } from "@/constants/constants";
import { save } from "@/utlis/localStorage";

export const loginAction = createAsyncThunk(
  "auth/login",
  async (payload, _thunkApi) => {
    try {
      toast.loading("Loading...");
      const response = await fetch(`${VITE_API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.message);
      }
      toast.dismiss();
      toast.success("Login Success");
      console.log(json);

      return json.data;
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
      return _thunkApi.rejectWithValue(error.message || "Failed to login");
    }
  }
);

export const registerAction = createAsyncThunk(
  "auth/register",
  async (payload, _thunkApi) => {
    try {
      toast.loading("Loading...");
      const response = await fetch(`${VITE_API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const json = await response.json();

      if (response.status !== 201) {
        throw new Error(json.message);
      }
      toast.dismiss();
      toast.success("Register Success");
      console.log(json);
      return json.data;
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
      return _thunkApi.rejectWithValue(error.message || "Failed to register");
    }
  }
);

export const logoutAction = createAction("auth/logout", () => {
  save(localStorageKeys.token, null);
  toast.success("Logout berhasil");
  
  return {
    payload: null,
  };
});
