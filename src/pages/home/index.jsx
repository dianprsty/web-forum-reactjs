import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllThreads, getThreadById } from "@/redux/actions/threads";
import { getAllUsers } from "@/redux/actions/user";
import AppLayout from "@/layouts/AppLayout";
import ThreadCard from "@/components/ThreadCard";

export default function ThreadsHome() {
  const threads = useSelector((state) => state.threads.threads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllThreads());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (threads.length > 0) {
      threads.slice(0, 5).forEach((thread) => {
        dispatch(getThreadById(thread.id));
      });
    }
  }, [threads.length, dispatch]);
  return (
    <AppLayout>
      <div className="flex flex-col max-w-xl mx-auto sm:border sm:border-gray-300 lg:shadow rounded-2xl">
        <div>
          <h1 className="text-xl font-bold p-4">Ask Anything</h1>
        </div>
        {threads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </AppLayout>
  );
}
