import { createSlice } from "@reduxjs/toolkit";
import { getAllThreads, createThread, getThreadById } from "../actions/threads";

const initialState = {
  threads: [],
  isLoading: false,
  error: null,
  createThreadStatus: {
    isLoading: false,
    error: null,
    success: false,
  },
  threadDetail: null,
  threadDetailStatus: {
    isLoading: false,
    error: null,
  },
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
        state.threads = action.payload.threads;
      })
      .addCase(getAllThreads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createThread.pending, (state) => {
        state.createThreadStatus.isLoading = true;
        state.createThreadStatus.error = null;
        state.createThreadStatus.success = false;
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.createThreadStatus.isLoading = false;
        state.createThreadStatus.success = true;
        state.threads = [action.payload.thread, ...state.threads];
      })
      .addCase(createThread.rejected, (state, action) => {
        state.createThreadStatus.isLoading = false;
        state.createThreadStatus.error =
          action.payload?.message || action.error.message;
        state.createThreadStatus.success = false;
      })
      .addCase(getThreadById.pending, (state, action) => {
        const isFromVotes = action.meta.arg.fromVotes;
        
        if (!isFromVotes) {
          state.threadDetailStatus.isLoading = true;
        }
        state.threadDetailStatus.error = null;
      })
      .addCase(getThreadById.fulfilled, (state, action) => {
        state.threadDetailStatus.isLoading = false;
        state.threadDetail = action.payload.detailThread;

        const index = state.threads.findIndex(
          (thread) => thread.id === action.payload.detailThread.id
        );
        if (index !== -1) {
          state.threads[index] = action.payload.detailThread;
        }
      })
      .addCase(getThreadById.rejected, (state, action) => {
        state.threadDetailStatus.isLoading = false;
        state.threadDetailStatus.error =
          action.payload?.message || action.error.message;
      });
  },
});

export default threadsSlice.reducer;
