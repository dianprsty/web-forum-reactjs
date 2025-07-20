import { createAsyncThunk } from "@reduxjs/toolkit";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { getUserProfile, getUserThreads, getAllUsers } from "./user";
import { load } from "@/utlis/localStorage";
import { localStorageKeys } from "@/constants/constants";
import toast from "react-hot-toast";

vi.mock("react-hot-toast", () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  },
}));

vi.mock("@/utlis/localStorage", () => ({
  load: vi.fn(),
}));

const fakeUser = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://example.com/avatar.jpg",
};

const fakeUsers = [
  fakeUser,
  {
    id: "user-2",
    name: "Jane Doe",
    email: "jane@example.com",
    avatar: "https://example.com/avatar2.jpg",
  },
];
const userThreads = [
  {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "user-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: "thread-2",
    title: "Thread Kedua",
    body: "Ini adalah thread kedua",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "user-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

describe("user thunk", () => {
  it("should create the action types", async () => {
    const thunkActionCreator = createAsyncThunk(
      "user/getUserProfile",
      async (_, _thunkApi) => {}
    );
    expect(thunkActionCreator.pending.type).toBe("user/getUserProfile/pending");
    expect(thunkActionCreator.fulfilled.type).toBe(
      "user/getUserProfile/fulfilled"
    );
    expect(thunkActionCreator.rejected.type).toBe(
      "user/getUserProfile/rejected"
    );
  });

  describe("getUserProfile thunk", () => {
    let originalFetch;

    beforeEach(() => {
      originalFetch = global.fetch;
      load.mockReturnValue("fake-token");
    });

    afterEach(() => {
      global.fetch = originalFetch;
      vi.clearAllMocks();
    });

    it("should dispatch pending and fulfilled when resolved", async () => {
      const mockResponse = {
        json: () =>
          Promise.resolve({
            status: "success",
            message: "User profile retrieved",
            data: fakeUser,
          }),
        status: 200,
        ok: true,
      };
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const dispatch = vi.fn();
      const getState = vi.fn();
      const extra = {};

      await getUserProfile()(dispatch, getState, extra);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/users/me"),
        expect.objectContaining({
          headers: {
            Authorization: "Bearer fake-token",
          },
        })
      );

      expect(dispatch).toHaveBeenCalledTimes(2);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.type).toBe("user/getUserProfile/pending");

      const fulfilledAction = dispatch.mock.calls[1][0];
      expect(fulfilledAction.type).toBe("user/getUserProfile/fulfilled");
      expect(fulfilledAction.payload).toEqual(fakeUser);
    });

    it("should dispatch pending and rejected when API returns non-200 status", async () => {
      const mockResponse = {
        json: () =>
          Promise.resolve({
            status: "fail",
            message: "User not found",
          }),
        status: 404,
        ok: false,
      };
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const dispatch = vi.fn();
      const getState = vi.fn();
      const extra = {};

      await getUserProfile()(dispatch, getState, extra);

      expect(dispatch).toHaveBeenCalledTimes(2);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.type).toBe("user/getUserProfile/pending");

      const rejectedAction = dispatch.mock.calls[1][0];
      expect(rejectedAction.type).toBe("user/getUserProfile/rejected");
      expect(rejectedAction.payload).toBe("User not found");

      expect(toast.error).toHaveBeenCalledWith("User not found");
    });

    it("should dispatch pending and rejected when token is not found", async () => {
      load.mockReturnValue(null);

      const dispatch = vi.fn();
      const getState = vi.fn();
      const extra = {};

      await getUserProfile()(dispatch, getState, extra);

      expect(dispatch).toHaveBeenCalledTimes(2);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.type).toBe("user/getUserProfile/pending");

      const rejectedAction = dispatch.mock.calls[1][0];
      expect(rejectedAction.type).toBe("user/getUserProfile/rejected");
      expect(rejectedAction.payload).toBe("Token not found");

      expect(toast.error).toHaveBeenCalledWith("Token not found");
    });

    it("should dispatch pending and rejected when fetch throws an error", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

      const dispatch = vi.fn();
      const getState = vi.fn();
      const extra = {};

      await getUserProfile()(dispatch, getState, extra);

      expect(dispatch).toHaveBeenCalledTimes(2);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.type).toBe("user/getUserProfile/pending");

      const rejectedAction = dispatch.mock.calls[1][0];
      expect(rejectedAction.type).toBe("user/getUserProfile/rejected");
      expect(rejectedAction.payload).toBe("Network error");

      expect(toast.error).toHaveBeenCalledWith("Network error");
    });
  });

  describe("getUserThreads thunk", () => {
    let originalFetch;

    beforeEach(() => {
      originalFetch = global.fetch;
    });

    afterEach(() => {
      global.fetch = originalFetch;
      vi.clearAllMocks();
    });

    it("should dispatch pending and fulfilled when resolved", async () => {
      const mockResponse = {
        json: () =>
          Promise.resolve({
            status: "success",
            message: "Threads retrieved",
            data: {
              threads: userThreads,
            },
          }),
        status: 200,
        ok: true,
      };
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const dispatch = vi.fn();
      const getState = vi.fn();
      const extra = {};

      await getUserThreads("user-1")(dispatch, getState, extra);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/threads")
      );

      expect(dispatch).toHaveBeenCalledTimes(2);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.type).toBe("user/getUserThreads/pending");

      const fulfilledAction = dispatch.mock.calls[1][0];
      expect(fulfilledAction.type).toBe("user/getUserThreads/fulfilled");
      expect(fulfilledAction.payload).toEqual(userThreads);
    });

    it("should dispatch pending and rejected when API returns non-200 status", async () => {
      const mockResponse = {
        json: () =>
          Promise.resolve({
            status: "fail",
            message: "Failed to get threads",
          }),
        status: 500,
        ok: false,
      };
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const dispatch = vi.fn();
      const getState = vi.fn();
      const extra = {};

      await getUserThreads("user-1")(dispatch, getState, extra);

      expect(dispatch).toHaveBeenCalledTimes(2);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.type).toBe("user/getUserThreads/pending");

      const rejectedAction = dispatch.mock.calls[1][0];
      expect(rejectedAction.type).toBe("user/getUserThreads/rejected");
      expect(rejectedAction.payload).toBe("Failed to get threads");

      expect(toast.error).toHaveBeenCalledWith("Failed to get threads");
    });

    it("should dispatch pending and rejected when fetch throws an error", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

      const dispatch = vi.fn();
      const getState = vi.fn();
      const extra = {};

      await getUserThreads("user-1")(dispatch, getState, extra);

      expect(dispatch).toHaveBeenCalledTimes(2);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.type).toBe("user/getUserThreads/pending");

      const rejectedAction = dispatch.mock.calls[1][0];
      expect(rejectedAction.type).toBe("user/getUserThreads/rejected");
      expect(rejectedAction.payload).toBe("Network error");

      expect(toast.error).toHaveBeenCalledWith("Network error");
    });
  });

  describe("getAllUsers thunk", () => {
    let originalFetch;

    beforeEach(() => {
      originalFetch = global.fetch;
    });

    afterEach(() => {
      global.fetch = originalFetch;
      vi.clearAllMocks();
    });

    it("should dispatch pending and fulfilled when resolved", async () => {
      const mockResponse = {
        json: () =>
          Promise.resolve({
            status: "success",
            message: "Users retrieved",
            data: {
              users: fakeUsers,
            },
          }),
        status: 200,
        ok: true,
      };
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const dispatch = vi.fn();
      const getState = vi.fn();
      const extra = {};

      await getAllUsers()(dispatch, getState, extra);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/users")
      );

      expect(dispatch).toHaveBeenCalledTimes(2);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.type).toBe("user/getAllUsers/pending");

      const fulfilledAction = dispatch.mock.calls[1][0];
      expect(fulfilledAction.type).toBe("user/getAllUsers/fulfilled");
      expect(fulfilledAction.payload).toEqual({ users: fakeUsers });
    });

    it("should dispatch pending and rejected when rejected", async () => {
      const mockResponse = {
        json: () =>
          Promise.reject({
            status: "fail",
            message: "Failed to get users",
          }),
        status: 500,
        ok: false,
      };
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const dispatch = vi.fn();
      const getState = vi.fn();
      const extra = {};

      await getAllUsers()(dispatch, getState, extra);

      expect(dispatch).toHaveBeenCalledTimes(2);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.type).toBe("user/getAllUsers/pending");

      const rejectedAction = dispatch.mock.calls[1][0];
      expect(rejectedAction.type).toBe("user/getAllUsers/rejected");
      expect(rejectedAction.payload).toBe("Failed to get users");

      expect(toast.error).toHaveBeenCalledWith("Failed to get users");
    });

    it("should dispatch pending and rejected when fetch throws an error", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

      const dispatch = vi.fn();
      const getState = vi.fn();
      const extra = {};

      await getAllUsers()(dispatch, getState, extra);

      expect(dispatch).toHaveBeenCalledTimes(2);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.type).toBe("user/getAllUsers/pending");

      const rejectedAction = dispatch.mock.calls[1][0];
      expect(rejectedAction.type).toBe("user/getAllUsers/rejected");
      expect(rejectedAction.payload).toBe("Network error");

      expect(toast.error).toHaveBeenCalledWith("Network error");
    });
  });
});
