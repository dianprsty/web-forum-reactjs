import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/redux/slice/counter";
import authReducer from "@/redux/slice/auth";
import threadsReducer from "@/redux/slice/threads";
import leaderboardReducer from "@/redux/slice/leaderboard";
import userReducer from "@/redux/slice/user";

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    threads: threadsReducer,
    leaderboard: leaderboardReducer,
    user: userReducer,
  },
});
