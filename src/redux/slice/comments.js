import { createSlice } from "@reduxjs/toolkit";
import { createComment } from "../actions/comments";

const initialState = {
  comments: [],
  createCommentStatus: {
    isLoading: false,
    error: null,
    success: false,
  },
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetCommentStatus: (state) => {
      state.createCommentStatus = {
        isLoading: false,
        error: null,
        success: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.createCommentStatus.isLoading = true;
        state.createCommentStatus.error = null;
        state.createCommentStatus.success = false;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.createCommentStatus.isLoading = false;
        state.createCommentStatus.success = true;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.createCommentStatus.isLoading = false;
        state.createCommentStatus.error = action.payload || action.error.message;
        state.createCommentStatus.success = false;
      });
  },
});

export const { resetCommentStatus } = commentsSlice.actions;
export default commentsSlice.reducer;