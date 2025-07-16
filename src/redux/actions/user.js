import { VITE_API_BASE_URL } from "@/utlis/env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { load } from "@/utlis/localStorage";
import { localStorageKeys } from "@/constants/constants";
import toast from "react-hot-toast";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, _thunkApi) => {
    try {
      const token = load(localStorageKeys.token, null);
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(`${VITE_API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.message);
      }
      
      return json.data;
    } catch (error) {
      toast.error(error.message);
      return _thunkApi.rejectWithValue(error.message || "Failed to get user profile");
    }
  }
);

export const getUserThreads = createAsyncThunk(
  "user/getUserThreads",
  async (userId, _thunkApi) => {
    try {
      const response = await fetch(`${VITE_API_BASE_URL}/threads`);
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.message);
      }

      const userThreads = json.data.threads.filter(
        (thread) => thread.ownerId === userId
      );
      
      return userThreads;
    } catch (error) {
      toast.error(error.message);
      return _thunkApi.rejectWithValue(error.message || "Failed to get user threads");
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, _thunkApi) => {
    try {
      const response = await fetch(`${VITE_API_BASE_URL}/users`);
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.message);
      }

      return json.data;
    } catch (error) {
      toast.error(error.message);
      return _thunkApi.rejectWithValue(error.message || "Failed to get all users");
    }
  }
);