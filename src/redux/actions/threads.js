import { VITE_API_BASE_URL } from "@/utlis/env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { load } from "@/utlis/localStorage";
import { localStorageKeys } from "@/constants/constants";
import toast from "react-hot-toast";

const getAllThreads = createAsyncThunk("threads/getAllThreads", async () => {
  const response = await fetch(`${VITE_API_BASE_URL}/threads`);
  const data = await response.json();
  return data.data;
});

const createThread = createAsyncThunk(
  "threads/createThread",
  async (payload, _thunkApi) => {
    try {
      toast.loading("Creating thread...");
      const token = load(localStorageKeys.token, null);
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(`${VITE_API_BASE_URL}/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const json = await response.json();

      if (response.status !== 201) {
        throw new Error(json.message);
      }
      toast.dismiss();
      toast.success("Thread created successfully");
      return json.data;
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
      return _thunkApi.rejectWithValue(error);
    }
  }
);

const getThreadById = createAsyncThunk(
  "threads/getThreadById",
  async (threadId, _thunkApi) => {
    const isFromVotes = typeof threadId === 'object' && threadId.fromVotes;
    const actualThreadId = typeof threadId === 'object' ? threadId.threadId : threadId;
    try {
      const response = await fetch(`${VITE_API_BASE_URL}/threads/${actualThreadId}`);
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.message);
      }
      return {
        ...json.data,
        fromVotes: isFromVotes
      };
    } catch (error) {
      toast.error(error.message);
      return _thunkApi.rejectWithValue(error);
    }
  }
);

export { getAllThreads, createThread, getThreadById };
