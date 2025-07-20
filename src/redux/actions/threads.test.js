import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { createThread, getAllThreads, getThreadById } from "./threads";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fakeThreads = [
  {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "users-1",
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
    ownerId: "users-2",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeThread = {
  id: "thread-1",
  title: "Thread Pertama",
  body: "Ini adalah thread pertama",
  category: "General",
  createdAt: "2021-06-21T07:00:00.000Z",
  ownerId: "users-1",
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

describe("create threads actions types", () => {
  it("should create get all threads action types", async () => {
    const thunkActionCreator = createAsyncThunk(
      "threads/getAllThreads",
      async (_, _thunkApi) => {}
    );
    expect(thunkActionCreator.pending.type).toBe(
      "threads/getAllThreads/pending"
    );
    expect(thunkActionCreator.fulfilled.type).toBe(
      "threads/getAllThreads/fulfilled"
    );
    expect(thunkActionCreator.rejected.type).toBe(
      "threads/getAllThreads/rejected"
    );
  });

  it("should create get thread by id action types", async () => {
    const thunkActionCreator = createAsyncThunk(
      "threads/getThreadById",
      async (_, _thunkApi) => {}
    );
    expect(thunkActionCreator.pending.type).toBe(
      "threads/getThreadById/pending"
    );
    expect(thunkActionCreator.fulfilled.type).toBe(
      "threads/getThreadById/fulfilled"
    );
    expect(thunkActionCreator.rejected.type).toBe(
      "threads/getThreadById/rejected"
    );
  });

  it("should create create thread action types", async () => {
    const thunkActionCreator = createAsyncThunk(
      "threads/createThread",
      async (_, _thunkApi) => {}
    );
    expect(thunkActionCreator.pending.type).toBe(
      "threads/createThread/pending"
    );
    expect(thunkActionCreator.fulfilled.type).toBe(
      "threads/createThread/fulfilled"
    );
    expect(thunkActionCreator.rejected.type).toBe(
      "threads/createThread/rejected"
    );
  });
});

describe("get all threads thunk ", () => {
  const mockFetch = vi.fn();
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = mockFetch;
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should dispatch pending and fulfilled when resolved", async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ data: fakeThreads }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    await getAllThreads()(dispatch, getState, {});

    expect(dispatch).toBeCalledTimes(2);

    expect(dispatch.mock.calls[0][0].type).toBe(getAllThreads.pending.type);
    expect(dispatch.mock.calls[1][0].type).toBe(getAllThreads.fulfilled.type);
    expect(dispatch.mock.calls[1][0].payload).toEqual(fakeThreads);
  });

  it("should dispatch pending and rejected when rejected", async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();
    const mockResponse = {
      ok: false,
      json: () => Promise.reject({ message: "Failed to fetch threads" }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    await getAllThreads()(dispatch, getState, {});

    expect(dispatch).toBeCalledTimes(2);

    expect(dispatch.mock.calls[0][0].type).toBe(getAllThreads.pending.type);
    expect(dispatch.mock.calls[1][0].type).toBe(getAllThreads.rejected.type);
  });
});

describe("get thread by id thunk ", () => {
  const mockFetch = vi.fn();
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = mockFetch;
  });
  
  afterEach(() => {
    vi.clearAllMocks();
    global.fetch = originalFetch;
  });

  it("should dispatch pending and fulfilled when resolved", async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();
    const threadsById = { ...fakeThread, fromVotes: false };
    const mockResponse = {
      ok: true,
      status: 200,
      json: () => Promise.resolve({ data: threadsById }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    await getThreadById("thread-1")(dispatch, getState, {});

    expect(dispatch).toBeCalledTimes(2);

    expect(dispatch.mock.calls[0][0].type).toBe(getThreadById.pending.type);
    expect(dispatch.mock.calls[1][0].type).toBe(getThreadById.fulfilled.type);
    expect(dispatch.mock.calls[1][0].payload).toEqual(threadsById);
  });

  it("should dispatch pending and rejected when rejected", async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();
    const errorMessage = "Failed to fetch thread";
    const mockResponse = {
      ok: false,
      status: 404,
      json: () => Promise.resolve({ message: errorMessage }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    await getThreadById("thread-1")(dispatch, getState, {});

    expect(dispatch).toBeCalledTimes(2);

    expect(dispatch.mock.calls[0][0].type).toBe(getThreadById.pending.type);
    expect(dispatch.mock.calls[1][0].type).toBe(getThreadById.rejected.type);
    expect(dispatch.mock.calls[1][0].payload).toBe(errorMessage);
  });
});

describe("create threads thunk", () => {
  const mockFetch = vi.fn();
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = mockFetch;
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should dispatch pending and fulfilled when resolved", async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();
    const mockResponse = {
      ok: true,
      status: 201,
      json: () => Promise.resolve({ data: fakeThread }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    await createThread(fakeThread)(dispatch, getState, {});

    expect(dispatch).toBeCalledTimes(2);
  });

  it("should dispatch pending and rejected when rejected", async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();
    const errorMessage = "Failed to create thread";
    const mockResponse = {
      ok: false,
      status: 400,
      json: () => Promise.resolve({ message: errorMessage }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    await createThread(fakeThread)(dispatch, getState, {});

    expect(dispatch).toBeCalledTimes(2);
  });
});
