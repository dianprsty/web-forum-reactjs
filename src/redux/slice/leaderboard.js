import { createSlice } from "@reduxjs/toolkit";
import { getLeaderboard } from "../actions/leaderboard";
import { fetchStatus } from "@/constants/constants";

const initialState = {
  fetchStatus: fetchStatus.idle,
  leaderboard: [],
  isLoading: false,
  error: null,
};

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboard.pending, (state) => {
        state.fetchStatus = fetchStatus.pending;
        state.isLoading = true;
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.fetchStatus = fetchStatus.success;
        state.isLoading = false;
        state.leaderboard = action.payload.leaderboards;
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.error;
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default leaderboardSlice.reducer;
