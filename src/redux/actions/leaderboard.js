import { VITE_API_BASE_URL } from "@/utlis/env";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLeaderboard = createAsyncThunk(
  "leaderboard/getLeaderboard",
  async (_, _thunkApi) => {
    try {
      const response = await fetch(`${VITE_API_BASE_URL}/leaderboards`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      return _thunkApi.rejectWithValue(error);
    }
  }
);
