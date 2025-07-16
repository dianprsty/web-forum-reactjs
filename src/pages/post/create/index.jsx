import AppLayout from "@/layouts/AppLayout";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createThread } from "@/redux/actions/threads";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function CreatePostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createThreadStatus } = useSelector((state) => state.threads);
  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (createThreadStatus.success) {
      setTitle("");
      setBody("");
      setCategory("");
      
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [createThreadStatus.success, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const threadData = {
      title,
      body,
    };
    
    if (category.trim()) {
      threadData.category = category;
    }
    
    dispatch(createThread(threadData));
  };

  return (
    <AppLayout>
      <Toaster position="top-center" />
      <div className="flex flex-col max-w-xl mx-auto sm:border sm:border-gray-300 lg:shadow rounded-2xl">
        <div>
          <h1 className="text-xl font-bold p-4">Create New Thread</h1>
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-300">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter thread title"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
              placeholder="Write your thread content here..."
              required
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter thread category"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={createThreadStatus.isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {createThreadStatus.isLoading ? "Creating..." : "Create Thread"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}