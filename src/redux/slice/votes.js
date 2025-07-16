import { createSlice } from "@reduxjs/toolkit";
import {
  upvoteThread,
  downvoteThread,
  neutralizeThreadVote,
  upvoteComment,
  downvoteComment,
  neutralizeCommentVote,
} from "../actions/votes";

const initialState = {
  threadVotes: {},
  commentVotes: {},
  isLoading: false,
  error: null,
};

const votesSlice = createSlice({
  name: "votes",
  initialState,
  reducers: {
    setThreadVoteOptimistic: (state, action) => {
      const { threadId, voteType, userId } = action.payload;
      state.threadVotes[threadId] = voteType;
    },
    setCommentVoteOptimistic: (state, action) => {
      const { commentId, voteType, userId } = action.payload;
      state.commentVotes[commentId] = voteType;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(upvoteThread.pending, (state) => {
        state.error = null;
      })
      .addCase(upvoteThread.fulfilled, (state, action) => {
      })
      .addCase(upvoteThread.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(downvoteThread.pending, (state) => {
        state.error = null;
      })
      .addCase(downvoteThread.fulfilled, (state, action) => {
      })
      .addCase(downvoteThread.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(neutralizeThreadVote.pending, (state) => {
        state.error = null;
      })
      .addCase(neutralizeThreadVote.fulfilled, (state, action) => {
      })
      .addCase(neutralizeThreadVote.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(upvoteComment.pending, (state) => {
        state.error = null;
      })
      .addCase(upvoteComment.fulfilled, (state, action) => {
      })
      .addCase(upvoteComment.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(downvoteComment.pending, (state) => {
        state.error = null;
      })
      .addCase(downvoteComment.fulfilled, (state, action) => {
      })
      .addCase(downvoteComment.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(neutralizeCommentVote.pending, (state) => {
        state.error = null;
      })
      .addCase(neutralizeCommentVote.fulfilled, (state, action) => {
      })
      .addCase(neutralizeCommentVote.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setThreadVoteOptimistic, setCommentVoteOptimistic } = votesSlice.actions;
export default votesSlice.reducer;