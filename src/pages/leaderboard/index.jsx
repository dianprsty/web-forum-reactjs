import AppLayout from "@/layouts/AppLayout";
import { getLeaderboard } from "@/redux/actions/leaderboard";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function LeaderboardPage() {
  const { leaderboard, isLoading } = useSelector((state) => state.leaderboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaderboard());

    return () => {
      toast.dismiss();
    };
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col max-w-xl mx-auto sm:border sm:border-gray-300 lg:shadow rounded-2xl pt-2">
        <h1 className="text-2xl font-bold p-4 text-center">Leaderbord</h1>
        <div className="flex justify-between items-center px-4 py-2 border-b-2 border-gray-300 lg:last:border-0">
          <div className="flex items-center flex-1 gap-2">
            <p className="font-semibold text-lg">Penggguna</p>
          </div>
          <div className="px-4">
            <p className="font-bold text-lg">Skor</p>
          </div>
        </div>
        {isLoading && leaderboard.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Loading leaderboard data...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              Tidak ada data leaderboard yang tersedia
            </p>
          </div>
        ) : (
          leaderboard.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center px-4 py-3 border-b border-gray-300 last:border-0"
            >
              <div className="flex items-center flex-1 gap-2">
                <img
                  src={item.user.avatar}
                  alt="avatar"
                  className="rounded-full h-11 w-11"
                />
                <div>
                  <p className="font-semibold">{item.user.name}</p>
                  <p className="text-sm text-gray-800">{item.user.email}</p>
                </div>
              </div>
              <div className="px-2">
                <p>
                  <span className="font-bold">{item.score}</span>{" "}
                  <span className="text-sm">Points</span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </AppLayout>
  );
}
