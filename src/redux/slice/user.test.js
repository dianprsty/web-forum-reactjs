import { describe, expect, it } from "vitest";
import userReducer from "./user";

describe("userReducer function", () => {
  it("should return the initial state", () => {
    const initialState = {
      profile: null,
      threads: [],
      users: [],
      usersMap: {},
      fetchStatus: "idle",
      isLoading: false,
      error: null,
    };
    const action = { type: "unknown" };
    const state = userReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it("should handle getUserProfile.pending", () => {
    const action = { type: "user/getUserProfile/pending" };
    const state = userReducer(undefined, action);
    expect(state.fetchStatus).toBe("pending");
  });

  it("should handle getUserProfile.fulfilled", () => {
    const action = { type: "user/getUserProfile/fulfilled", payload: {} };
    const state = userReducer(undefined, action);
    expect(state.profile).toBe(action.payload.user);
  });

  it("should handle getUserProfile.rejected", () => {
    const action = {
      type: "user/getUserProfile/rejected",
      payload: { message: "error" },
    };
    const state = userReducer(undefined, action);
    expect(state.error).toBe("error");
  });

  it("should handle getUserThreads.pending", () => {
    const action = { type: "user/getUserThreads/pending" };
    const state = userReducer(undefined, action);
    expect(state.fetchStatus).toBe("pending");
  });

  it("should handle getUserThreads.fulfilled", () => {
    const action = { type: "user/getUserThreads/fulfilled", payload: {} };
    const state = userReducer(undefined, action);
    expect(state.threads).toBe(action.payload);
  });

  it("should handle getUserThreads.rejected", () => {
    const action = {
      type: "user/getUserThreads/rejected",
      payload: { message: "error" },
    };
    const state = userReducer(undefined, action);
    expect(state.error).toBe("error");
  });

  
});

