import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  upvoteThread,
  downvoteThread,
  neutralizeThreadVote,
} from "@/redux/actions/votes";
import { setThreadVoteOptimistic } from "@/redux/slice/votes";
import {
  ChatBubbleOvalLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbDownIcon as HandThumbDownIconSolid,
  HandThumbUpIcon as HandThumbUpIconSolid,
} from "@heroicons/react/24/solid";
import cn from "@/utlis/classname";
import toast from "react-hot-toast";

export default function ThreadCard({ thread }) {
  const dispatch = useDispatch();
  const usersMap = useSelector((state) => state.user.usersMap);
  const { profile } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const owner = thread.owner || (thread.ownerId && usersMap[thread.ownerId]);

  const handleUpvote = () => {
    if (!token) {
      toast.error("Please login to vote");
      return;
    }

    const isUpvoted = thread.upVotesBy?.includes(profile.id);
    if (isUpvoted) {
      dispatch(
        setThreadVoteOptimistic({
          threadId: thread.id,
          voteType: 0,
          userId: profile.id,
        })
      );
      dispatch(neutralizeThreadVote(thread.id));
    } else {
      dispatch(
        setThreadVoteOptimistic({
          threadId: thread.id,
          voteType: 1,
          userId: profile.id,
        })
      );
      dispatch(upvoteThread(thread.id));
    }
  };

  const handleDownvote = () => {
    if (!token) {
      toast.error("Please login to vote");
      return;
    }
    const isDownvoted = thread.downVotesBy?.includes(profile.id);
    if (isDownvoted) {
      dispatch(
        setThreadVoteOptimistic({
          threadId: thread.id,
          voteType: 0,
          userId: profile.id,
        })
      );
      dispatch(neutralizeThreadVote(thread.id));
    } else {
      dispatch(
        setThreadVoteOptimistic({
          threadId: thread.id,
          voteType: -1,
          userId: profile.id,
        })
      );
      dispatch(downvoteThread(thread.id));
    }
  };

  return (
    <div className="p-4 flex flex-col border-t border-gray-300">
      {thread.category && (
        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full mb-2 inline-block w-fit">
          #{thread.category}
        </span>
      )}
      <Link to={`/thread/${thread.id}`}>
        <h2 className="font-bold mb-1 hover:text-blue-600 transition-colors">
          {thread.title}
        </h2>
      </Link>
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
        {owner ? (
          <>
            {owner.avatar && (
              <img
                src={owner.avatar}
                alt={owner.name}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span className="font-medium">{owner.name}</span>
          </>
        ) : (
          <span className="font-medium">Anonymous</span>
        )}
        <span>•</span>
        <span>{format(thread.createdAt)}</span>
      </div>

      <div className="line-clamp-6 text-ellipsis">{parse(thread.body)}</div>
      <div className="flex gap-8 text-gray-800 pt-4">
        <button
          className={`flex gap-1 items-center ${
            thread.upVotesBy?.includes(profile?.id)
              ? "text-zinc-900 font-bold"
              : ""
          }`}
          onClick={handleUpvote}
        >
          {thread.upVotesBy?.includes(profile?.id) ? (
            <HandThumbUpIconSolid className="w-5 h-5 text-zinc-900" />
          ) : (
            <HandThumbUpIcon className="w-5 h-5" />
          )}{" "}
          {thread.upVotesBy?.length || 0}
        </button>
        <button
          className={`flex gap-1 items-center ${
            thread.downVotesBy?.includes(profile?.id)
              ? "text-zinc-900 font-bold"
              : ""
          }`}
          onClick={handleDownvote}
        >
          {thread.downVotesBy?.includes(profile?.id) ? (
            <HandThumbDownIconSolid className="w-5 h-5 text-zinc-900" />
          ) : (
            <HandThumbDownIcon className="w-5 h-5" />
          )}{" "}
          {thread.downVotesBy?.length || 0}
        </button>
        <div className="flex gap-1 items-center">
          <Link to={`/thread/${thread.id}`}>
            <ChatBubbleOvalLeftIcon className="w-5 h-5" />{" "}
          </Link>
          {thread?.totalComments || thread.comments?.length || 0}
        </div>
      </div>
    </div>
  );
}

ThreadCard.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
    totalComments: PropTypes.number,
    comments: PropTypes.arrayOf(PropTypes.object),
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  }).isRequired,
};
