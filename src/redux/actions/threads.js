import { VITE_API_BASE_URL } from "@/utlis/env";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllThreads = createAsyncThunk("threads/getAllThreads", async () => {
  const response = await fetch(`${VITE_API_BASE_URL}/threads`);
  const data = await response.json();
  return data.data;
});

export { getAllThreads };
