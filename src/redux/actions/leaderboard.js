import { VITE_API_BASE_URL } from "@/utlis/env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getLeaderboard = createAsyncThunk(
  "leaderboard/getLeaderboard",
  async (_, _thunkApi) => {
    try {
      toast.dismiss();
      toast.loading("Loading leaderboard...");
      const response = await fetch(`${VITE_API_BASE_URL}/leaderboards`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch leaderboard");
      }
      
      toast.dismiss();
      toast.success("Leaderboard loaded successfully");
      return data.data;
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Failed to load leaderboard");
      return _thunkApi.rejectWithValue(error.message || "Failed to load leaderboard");
    }
  }
);
