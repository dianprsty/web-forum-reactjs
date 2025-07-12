import { createSlice } from "@reduxjs/toolkit";
import { getAllThreads } from "../actions/threads";

const initialState = {
  threads: [],
  isLoading: false,
  error: null,
};

const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllThreads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllThreads.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        
        state.threads = action.payload.threads;
      })
      .addCase(getAllThreads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default threadsSlice.reducer;