import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { format } from "timeago.js";
import { useSelector } from "react-redux";

export default function ThreadCard({ thread }) {
  const usersMap = useSelector((state) => state.user.usersMap);

  const owner = thread.owner || (thread.ownerId && usersMap[thread.ownerId]);

  return (
    <div className="p-4 flex flex-col border-t border-gray-300">
      {thread.category && (
        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full mb-2 inline-block w-fit">
          #{thread.category}
        </span>
      )}
      <h2 className="font-bold mb-1">{thread.title}</h2>
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

      <p className="line-clamp-6 text-ellipsis">{parse(thread.body)}</p>
      <div className="flex gap-8 text-gray-800 pt-4">
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
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  }).isRequired,
};
