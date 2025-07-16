import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getThreadById } from "@/redux/actions/threads";
import { createComment } from "@/redux/actions/comments";
import { resetCommentStatus } from "@/redux/slice/comments";
import { getUserProfile } from "@/redux/actions/user";
import {
  upvoteThread,
  downvoteThread,
  neutralizeThreadVote,
  upvoteComment,
  downvoteComment,
  neutralizeCommentVote,
} from "@/redux/actions/votes";
import {
  setThreadVoteOptimistic,
  setCommentVoteOptimistic,
} from "@/redux/slice/votes";
import AppLayout from "@/layouts/AppLayout";
import parse from "html-react-parser";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import {
  ArrowLeftIcon,
  ChatBubbleOvalLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbDownIcon as HandThumbDownIconSolid,
  HandThumbUpIcon as HandThumbUpIconSolid,
} from "@heroicons/react/24/solid";

export default function ThreadDetailPage() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { threadDetail, threadDetailStatus } = useSelector(
    (state) => state.threads
  );
  const usersMap = useSelector((state) => state.user.usersMap);
  const { profile } = useSelector((state) => state.user);
  const { createCommentStatus } = useSelector((state) => state.comments);
  const { threadVotes, commentVotes } = useSelector((state) => state.votes);
  const { token } = useSelector((state) => state.auth);
  const [commentContent, setCommentContent] = useState("");

  const handleThreadUpvote = () => {
    if (!token) {
      toast.error("Please login to vote");
      return;
    }

    const isUpvoted = threadDetail.upVotesBy?.includes(profile?.id);
    if (isUpvoted) {
      dispatch(
        setThreadVoteOptimistic({
          threadId: threadDetail.id,
          voteType: 0,
          userId: profile?.id,
        })
      );
      dispatch(neutralizeThreadVote(threadDetail.id));
    } else {
      dispatch(
        setThreadVoteOptimistic({
          threadId: threadDetail.id,
          voteType: 1,
          userId: profile?.id,
        })
      );
      dispatch(upvoteThread(threadDetail.id));
    }
  };

  const handleThreadDownvote = () => {
    if (!token) {
      toast.error("Please login to vote");
      return;
    }

    const isDownvoted = threadDetail.downVotesBy?.includes(profile?.id);
    if (isDownvoted) {
      dispatch(
        setThreadVoteOptimistic({
          threadId: threadDetail.id,
          voteType: 0,
          userId: profile?.id,
        })
      );
      dispatch(neutralizeThreadVote(threadDetail.id));
    } else {
      dispatch(
        setThreadVoteOptimistic({
          threadId: threadDetail.id,
          voteType: -1,
          userId: profile?.id,
        })
      );
      dispatch(downvoteThread(threadDetail.id));
    }
  };

  const handleCommentUpvote = (comment) => {
    if (!token) {
      toast.error("Please login to vote");
      return;
    }

    const isUpvoted = comment.upVotesBy?.includes(profile?.id);
    if (isUpvoted) {
      dispatch(
        setCommentVoteOptimistic({
          commentId: comment.id,
          voteType: 0,
          userId: profile?.id,
        })
      );
      dispatch(
        neutralizeCommentVote({
          threadId: threadDetail.id,
          commentId: comment.id,
        })
      );
    } else {
      dispatch(
        setCommentVoteOptimistic({
          commentId: comment.id,
          voteType: 1,
          userId: profile?.id,
        })
      );
      dispatch(
        upvoteComment({ threadId: threadDetail.id, commentId: comment.id })
      );
    }
  };

  const handleCommentDownvote = (comment) => {
    if (!token) {
      toast.error("Please login to vote");
      return;
    }

    const isDownvoted = comment.downVotesBy?.includes(profile?.id);
    if (isDownvoted) {
      dispatch(
        setCommentVoteOptimistic({
          commentId: comment.id,
          voteType: 0,
          userId: profile?.id,
        })
      );
      dispatch(
        neutralizeCommentVote({
          threadId: threadDetail.id,
          commentId: comment.id,
        })
      );
    } else {
      dispatch(
        setCommentVoteOptimistic({
          commentId: comment.id,
          voteType: -1,
          userId: profile?.id,
        })
      );
      dispatch(
        downvoteComment({ threadId: threadDetail.id, commentId: comment.id })
      );
    }
  };

  useEffect(() => {
    dispatch(getThreadById(threadId));

    return () => {
      dispatch(resetCommentStatus());
    };
  }, [dispatch, threadId]);

  useEffect(() => {
    if (token && !profile) {
      dispatch(getUserProfile());
    }
  }, [dispatch, token, profile]);

  const owner =
    threadDetail?.owner ||
    (threadDetail?.ownerId && usersMap[threadDetail.ownerId]);

  useEffect(() => {
    if (createCommentStatus.success) {
      setCommentContent("");
      dispatch(resetCommentStatus());
    }
  }, [createCommentStatus.success, dispatch]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to comment");
      return;
    }

    if (!commentContent.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    dispatch(
      createComment({
        threadId,
        content: commentContent,
      })
    );
  };

  return (
    <AppLayout>
      {threadDetailStatus.isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : threadDetailStatus.error ? (
        <div className="text-center text-red-500 p-4">
          {threadDetailStatus.error}
        </div>
      ) : threadDetail ? (
        <div className="flex flex-col max-w-xl mx-auto sm:border sm:border-gray-300 lg:shadow rounded-2xl p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-zinc-900 mb-4"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>

          <div className="mb-6">
            {threadDetail.category && (
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full mb-2 inline-block w-fit">
                #{threadDetail.category}
              </span>
            )}
            <h1 className="text-2xl font-bold mb-2">{threadDetail.title}</h1>
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
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
              <span>{format(threadDetail.createdAt)}</span>
            </div>

            <div className="prose max-w-none mb-6">
              {parse(threadDetail.body)}
            </div>

            <div className="flex gap-8 text-gray-800 py-4 border-t border-b border-gray-200">
              <button
                className={`flex gap-1 items-center ${
                  threadDetail.upVotesBy?.includes(profile?.id)
                    ? "text-zinc-900 font-bold"
                    : ""
                }`}
                onClick={handleThreadUpvote}
              >
                {threadDetail.upVotesBy?.includes(profile?.id) ? (
                  <HandThumbUpIconSolid className="w-5 h-5 text-zinc-900" />
                ) : (
                  <HandThumbUpIcon className="w-5 h-5" />
                )}
                {threadDetail.upVotesBy?.length || 0}
              </button>
              <button
                className={`flex gap-1 items-center ${
                  threadDetail.downVotesBy?.includes(profile?.id)
                    ? "text-zinc-900 font-bold"
                    : ""
                }`}
                onClick={handleThreadDownvote}
              >
                {threadDetail.downVotesBy?.includes(profile?.id) ? (
                  <HandThumbDownIconSolid className="w-5 h-5 text-zinc-900" />
                ) : (
                  <HandThumbDownIcon className="w-5 h-5" />
                )}
                {threadDetail.downVotesBy?.length || 0}
              </button>
              <div className="flex gap-1 items-center">
                <ChatBubbleOvalLeftIcon size={20} className="w-5 h-5" />{" "}
                {threadDetail.comments?.length || 0}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>
            {!token ? (
              <div className="p-4 bg-gray-100 rounded-md text-center">
                <p className="text-gray-600 mb-2">
                  You need to be logged in to comment
                </p>
              </div>
            ) : (
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  rows="3"
                  placeholder="Write your comment here..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  disabled={createCommentStatus.isLoading}
                ></textarea>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    disabled={createCommentStatus.isLoading}
                  >
                    {createCommentStatus.isLoading
                      ? "Submitting..."
                      : "Submit Comment"}
                  </button>
                </div>
              </form>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Comments ({threadDetail.comments?.length || 0})
            </h2>
            {threadDetail.comments?.length > 0 ? (
              <div className="space-y-4">
                {threadDetail.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b border-gray-200 pb-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {comment.owner?.avatar && (
                        <img
                          src={comment.owner.avatar}
                          alt={comment.owner.name}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <span className="font-medium">{comment.owner?.name}</span>
                      <span className="text-sm text-gray-500">
                        • {format(comment.createdAt)}
                      </span>
                    </div>
                    <div className="pl-8">{parse(comment.content)}</div>
                    <div className="flex gap-4 mt-2 pl-8 text-sm">
                      <button
                        className={`flex gap-1 items-center ${
                          comment.upVotesBy?.includes(profile?.id)
                            ? "text-zinc-900 font-bold"
                            : ""
                        }`}
                        onClick={() => handleCommentUpvote(comment)}
                      >
                        {comment.upVotesBy?.includes(profile?.id) ? (
                          <HandThumbUpIconSolid className="w-4 h-4 text-zinc-900" />
                        ) : (
                          <HandThumbUpIcon className="w-4 h-4" />
                        )}
                        {comment.upVotesBy?.length || 0}
                      </button>
                      <button
                        className={`flex gap-1 items-center ${
                          comment.downVotesBy?.includes(profile?.id)
                            ? "text-zinc-900 font-bold"
                            : ""
                        }`}
                        onClick={() => handleCommentDownvote(comment)}
                      >
                        {comment.downVotesBy?.includes(profile?.id) ? (
                          <HandThumbDownIconSolid className="w-4 h-4 text-zinc-900" />
                        ) : (
                          <HandThumbDownIcon className="w-4 h-4" />
                        )}
                        {comment.downVotesBy?.length || 0}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      ) : null}
    </AppLayout>
  );
}
