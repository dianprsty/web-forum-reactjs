import { useEffect } from "react";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { getAllThreads } from "@/redux/actions/threads";
import { Heart, MessageCircle, Reply, ThumbsDown, ThumbsUp } from "lucide-react";

export default function ThreadsHome() {
  const threads = useSelector((state) => state.threads.threads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllThreads());
  }, []);
  return (
    <div className="flex flex-col max-w-xl mx-auto border border-gray-300 shadow rounded-2xl mt-4">
      <div>
        <h1 className="text-xl font-bold p-4">Ask Anything</h1>
      </div>
      {threads.map((thread) => (
        <div
          key={thread.id}
          className="p-4 flex flex-col border-t border-gray-300"
        >
          <h2 className="font-bold mb-2">{thread.title}</h2>
          <p className="line-clamp-6 text-ellipsis">{parse(thread.body)}</p>
          <div className="flex gap-8 text-gray-800 pt-4" >
            <button className="flex gap-1 items-center">
              <ThumbsUp size={20} /> {thread.upVotesBy?.length}
            </button>
            <button className="flex gap-1 items-center">
              <ThumbsDown size={20} /> {thread.downVotesBy?.length}
            </button>
            <button className="flex gap-1 items-center">
              <MessageCircle size={20} /> {thread.totalComments}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
