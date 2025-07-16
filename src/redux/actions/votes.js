import { VITE_API_BASE_URL } from "@/utlis/env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { load } from "@/utlis/localStorage";
import { localStorageKeys } from "@/constants/constants";
import toast from "react-hot-toast";
import { getThreadById } from "./threads";

export const upvoteThread = createAsyncThunk(
  "votes/upvoteThread",
  async (threadId, thunkAPI) => {
    try {
      const token = load(localStorageKeys.token, null);
      
      const response = await fetch(`${VITE_API_BASE_URL}/threads/${threadId}/up-vote`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to upvote thread");
      }

      thunkAPI.dispatch(getThreadById({ threadId, fromVotes: true }));

      return data.data.vote;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const downvoteThread = createAsyncThunk(
  "votes/downvoteThread",
  async (threadId, thunkAPI) => {
    try {
      const token = load(localStorageKeys.token, null);
      
      const response = await fetch(`${VITE_API_BASE_URL}/threads/${threadId}/down-vote`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to downvote thread");
      }

      thunkAPI.dispatch(getThreadById({ threadId, fromVotes: true }));

      return data.data.vote;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const neutralizeThreadVote = createAsyncThunk(
  "votes/neutralizeThreadVote",
  async (threadId, thunkAPI) => {
    try {
      const token = load(localStorageKeys.token, null);
      
      const response = await fetch(`${VITE_API_BASE_URL}/threads/${threadId}/neutral-vote`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to neutralize thread vote");
      }

      thunkAPI.dispatch(getThreadById({ threadId, fromVotes: true }));

      return data.data.vote;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const upvoteComment = createAsyncThunk(
  "votes/upvoteComment",
  async ({ threadId, commentId }, thunkAPI) => {
    try {
      const token = load(localStorageKeys.token, null);
      
      const response = await fetch(
        `${VITE_API_BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to upvote comment");
      }

      thunkAPI.dispatch(getThreadById({ threadId, fromVotes: true }));

      return data.data.vote;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const downvoteComment = createAsyncThunk(
  "votes/downvoteComment",
  async ({ threadId, commentId }, thunkAPI) => {
    try {
      const token = load(localStorageKeys.token, null);
      
      const response = await fetch(
        `${VITE_API_BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to downvote comment");
      }

      thunkAPI.dispatch(getThreadById({ threadId, fromVotes: true }));

      return data.data.vote;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const neutralizeCommentVote = createAsyncThunk(
  "votes/neutralizeCommentVote",
  async ({ threadId, commentId }, thunkAPI) => {
    try {
      const token = load(localStorageKeys.token, null);
      
      const response = await fetch(
        `${VITE_API_BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to neutralize comment vote");
      }

      thunkAPI.dispatch(getThreadById({ threadId, fromVotes: true }));

      return data.data.vote;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);