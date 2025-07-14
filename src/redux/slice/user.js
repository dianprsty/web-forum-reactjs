import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile, getUserThreads, getAllUsers } from "../actions/user";
import { fetchStatus } from "@/constants/constants";

const initialState = {
  profile: null,
  threads: [],
  users: [],
  usersMap: {},
  fetchStatus: fetchStatus.idle,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.fetchStatus = fetchStatus.pending;
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.success;
        state.isLoading = false;
        state.profile = action.payload.user;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.error;
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getUserThreads.pending, (state) => {
        state.fetchStatus = fetchStatus.pending;
        state.isLoading = true;
      })
      .addCase(getUserThreads.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.success;
        state.isLoading = false;
        state.threads = action.payload;
      })
      .addCase(getUserThreads.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.error;
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.fetchStatus = fetchStatus.pending;
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.success;
        state.isLoading = false;
        state.users = action.payload.users;

        const usersMap = {};
        action.payload.users.forEach((user) => {
          usersMap[user.id] = user;
        });
        state.usersMap = usersMap;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.error;
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;