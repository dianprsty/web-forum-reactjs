import { describe, expect, it } from "vitest";
import threadsReducer from "./threads";

describe("threadsReducer function", () => {
  it("should return the initial state", () => {
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
    const action = { type: "unknown" };
    const state = threadsReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it("should handle getAllThreads.pending", () => {
    const action = { type: "threads/getAllThreads/pending" };
    const state = threadsReducer(undefined, action);
    expect(state.isLoading).toBe(true);
  });

  it("should handle getAllThreads.fulfilled", () => {
    const action = { type: "threads/getAllThreads/fulfilled", payload: {} };
    const state = threadsReducer(undefined, action);
    expect(state.isLoading).toBe(false);
  });

  it("should handle getAllThreads.rejected", () => {
    const action = { type: "threads/getAllThreads/rejected", payload: {} };
    const state = threadsReducer(undefined, action);
    expect(state.isLoading).toBe(false);
  });

  it("should handle createThread.pending", () => {
    const action = { type: "threads/createThread/pending" };
    const state = threadsReducer(undefined, action);
    expect(state.createThreadStatus.isLoading).toBe(true);
    expect(state.createThreadStatus.error).toBe(null);
    expect(state.createThreadStatus.success).toBe(false);
  });

  it("should handle createThread.fulfilled", () => {
    const action = { type: "threads/createThread/fulfilled", payload: {} };
    const state = threadsReducer(undefined, action);
    expect(state.createThreadStatus.isLoading).toBe(false);
    expect(state.createThreadStatus.error).toBe(null);
    expect(state.createThreadStatus.success).toBe(true);
  });

  it("should handle createThread.rejected", () => {
    const action = {
      type: "threads/createThread/rejected",
      payload: { message: "error" },
    };
    const state = threadsReducer(undefined, action);
    expect(state.createThreadStatus.isLoading).toBe(false);
    expect(state.createThreadStatus.error).toBe("error");
    expect(state.createThreadStatus.success).toBe(false);
  });

  it("should handle getThreadById.pending", () => {
    const action = {
      type: "threads/getThreadById/pending",
      payload: { threadsId: "threadsId" },
    };
    const state = threadsReducer(undefined, action);
    expect(state.threadDetailStatus.isLoading).toBe(true);
    expect(state.threadDetailStatus.error).toBe(null);
  });

  it("should handle getThreadById.fulfilled", () => {
    const thread = {
      id: "threadsId",
      title: "title",
      body: "body",
      userId: "userId",
    };
    const initialState = {
      threads: [thread],
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

    const action = {
      type: "threads/getThreadById/fulfilled",
      payload: { detailThread: thread },
    };
    const state = threadsReducer(initialState, action);
    expect(state.threadDetailStatus.isLoading).toBe(false);
    expect(state.threadDetailStatus.error).toBe(null);
    expect(state.threadDetail).toBe(thread);
  });

  it("should handle getThreadById.rejected", () => {
    const action = {
      type: "threads/getThreadById/rejected",
      payload: { message: "error" },
    };
    const state = threadsReducer(undefined, action);
    expect(state.threadDetailStatus.isLoading).toBe(false);
    expect(state.threadDetailStatus.error).toBe("error");
  });
});
