import { VITE_API_BASE_URL } from "@/utlis/env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { load } from "@/utlis/localStorage";
import { localStorageKeys } from "@/constants/constants";
import toast from "react-hot-toast";
import { getThreadById } from "./threads";

const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ threadId, content }, thunkAPI) => {
    try {
      toast.loading("Posting comment...");
      const token = load(localStorageKeys.token, null);
      if (!token) {
        throw new Error("You must be logged in to comment");
      }

      const response = await fetch(`${VITE_API_BASE_URL}/threads/${threadId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add comment");
      }

      toast.dismiss();
      toast.success("Comment added successfully");
      
      thunkAPI.dispatch(getThreadById(threadId));
      
      return data.data.comment;
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { createComment };