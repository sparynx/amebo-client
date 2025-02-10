import React, { useState, useEffect } from "react";
import { useFetchAllPostsQuery } from "../redux/features/BlogsApi";
import Loader from "../components/Loader";
import FloatingActionButton from "../components/FloatingActionbutton";
import PostCard from "../components/PostCard";

const Home = () => {
  const { data: posts = [], isLoading, isError, refetch, isFetching } = useFetchAllPostsQuery();
  const [showRefresh, setShowRefresh] = useState(false);

  // Show the button only when posts have been fetched and are not currently updating
  useEffect(() => {
    if (!isLoading && !isFetching) {
      setShowRefresh(true);
    } else {
      setShowRefresh(false);
    }
  }, [isLoading, isFetching]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="text-red-500 text-center mb-4">
          <p className="text-xl font-semibold">Oops! Something went wrong</p>
          <p className="text-gray-600">Unable to load posts. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 sm:mb-8 text-center text-gray-900 tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Latest Amebo
          </span>
        </h1>

        {/* Refresh Button (Only Shows When Needed) */}
        {showRefresh && (
          <div className="flex justify-center mb-6">
            <button
              onClick={refetch}
              className="px-5 py-2  text-gray-400 rounded-lg shadow-md transition"
            >
              refresh 🔄
            </button>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="text-gray-500 text-lg text-center">No posts available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
      <FloatingActionButton />
    </div>
  );
};

export default Home;
