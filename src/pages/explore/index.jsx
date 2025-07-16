import AppLayout from "@/layouts/AppLayout";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllThreads, getThreadById } from "@/redux/actions/threads";
import { getAllUsers } from "@/redux/actions/user";
import ThreadCard from "@/components/ThreadCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function ExplorePage() {
  const threads = useSelector((state) => state.threads.threads);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const categorySet = new Set();
    threads.forEach((thread) => {
      if (thread.category) {
        categorySet.add(thread.category.toLowerCase());
      }
    });
    return Array.from(categorySet);
  }, [threads]);

  const filteredThreads = useMemo(() => {
    return threads.filter((thread) => {
      const titleMatch = thread.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const categoryMatch =
        selectedCategory === "all" ||
        (thread.category &&
          thread.category.toLowerCase() === selectedCategory.toLowerCase());
      return titleMatch && categoryMatch;
    });
  }, [threads, searchQuery, selectedCategory]);

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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <AppLayout>
      <div className="flex flex-col max-w-xl mx-auto sm:border sm:border-gray-300 lg:shadow rounded-2xl">
        <div>
          <h1 className="text-xl font-bold p-4">Explore Threads</h1>
        </div>

        <div className="px-4 pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search threads by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {categories.length > 0 && (
          <div className="px-4 pb-4 flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryClick("all")}
              className={`text-xs px-3 py-1 rounded-full ${
                selectedCategory === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400 hover:text-white transition-colors`}
            >
              Semua
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`text-xs px-3 py-1 rounded-full ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-blue-400 hover:text-white transition-colors`}
              >
                #{category}
              </button>
            ))}
          </div>
        )}

        <div className="border-t border-gray-300">
          {filteredThreads.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No threads found matching your criteria
            </div>
          ) : (
            filteredThreads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}
