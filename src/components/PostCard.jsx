import React from "react";
import { Heart, Loader2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useAddLikeMutation, useGetCommentsQuery, useGetLikesQuery, useRemoveLikeMutation } from "../redux/features/BlogsApi";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import DOMPurify from 'dompurify';

const sanitizeContent = (html) => {
  return DOMPurify.sanitize(html);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const truncateContent = (content, maxLength = 150) => {
  if (!content) return '';

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;

  const textContent = tempDiv.textContent || tempDiv.innerText || "";

  if (textContent.length <= maxLength) return content;
  
  return textContent.slice(0, maxLength).trim() + "...";
};


const PostCard = ({ post }) => {
    const { currentUser } = useAuth();
    const { data: comments = [] } = useGetCommentsQuery(post._id);
    const { data: likes = [] } = useGetLikesQuery(post._id);
    const [addLike, { isLoading: isLiking }] = useAddLikeMutation();
    const [removeLike, { isLoading: isUnliking }] = useRemoveLikeMutation();
    const [imageError, setImageError] = useState(false);
  
    const hasLiked = likes?.some(like => like.userId === currentUser?.uid);
    const isLoading = isLiking || isUnliking;
  
    const handleLike = async () => {
      if (!currentUser) {
        alert("Please log in to like posts");
        return;
      }
  
      try {
        if (hasLiked) {
          await removeLike({
            postId: post._id,
            userId: currentUser.uid
          }).unwrap();
        } else {
          await addLike({
            postId: post._id,
            userId: currentUser.uid
          }).unwrap();
        }
      } catch (error) {
        console.error('Like operation failed:', error);
        alert(error.data?.error || 'Failed to process like action');
      }
    };
  
    return (
      <div className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <div className="relative w-full pt-[56.25%]">
          <img 
            src={imageError ? '/placeholder-image.jpg' : (post.image || post.imageUrl)}
            alt={post.title} 
            className="absolute top-0 left-0 w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
          />
        </div>
        <div className="p-4 sm:p-6 flex-grow flex flex-col">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 line-clamp-2">{post.title}</h2>
          <div className="flex items-center text-gray-500 text-sm sm:text-base mb-3">
            <span className="mr-2 truncate">{post.authorName || "Unknown Author"}</span>
            <span>•</span>
            <span className="ml-2 whitespace-nowrap">{formatDate(post.createdAt)}</span>
          </div>
          <div 
            className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3"
            dangerouslySetInnerHTML={{ __html: sanitizeContent(truncateContent(post.content)) }}
          ></div>


          <div className="flex justify-between items-center mt-auto pt-4 border-gray-400 border-t">
            <Link 
              to={`/post/${post._id}`} 
              className="text-blue-500 hover:text-blue-600 text-sm sm:text-base font-medium hover:underline"
            >
              Read More
            </Link>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLike}
                disabled={isLoading} 
                className={`flex items-center ${
                  hasLiked ? 'text-red-500' : 'text-gray-600'
                } hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
                aria-label={hasLiked ? "Unlike post" : "Like post"}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mr-1" size={18} />
                ) : (
                  <Heart 
                    className="mr-1" 
                    size={18} 
                    fill={hasLiked ? "currentColor" : "none"}
                  />
                )}
                <span className="text-sm">{likes?.length || 0}</span>
              </button>
              <div className="flex items-center text-gray-600">
                <MessageCircle className="mr-1" size={18} />
                <span className="text-sm">{comments?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default PostCard;