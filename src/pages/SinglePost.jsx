import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, MessageCircle, User, Calendar, Tag, Share2, Twitter, Facebook, Link as LinkIcon } from 'lucide-react';
import { useFetchPostByIdQuery, useAddLikeMutation, useRemoveLikeMutation, useAddCommentMutation } from '../redux/features/BlogsApi';
import { useAuth } from '../context/AuthContext';

const SinglePost = () => {
    const { id: postId } = useParams();
    const { data: post, isLoading, error } = useFetchPostByIdQuery(postId);
    const [addLike, { isLoading: isLiking }] = useAddLikeMutation();
    const [removeLike, { isLoading: isUnliking }] = useRemoveLikeMutation();
    const [addComment] = useAddCommentMutation();
    const [commentText, setCommentText] = useState('');
    const [isLikeAnimating, setIsLikeAnimating] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);

    const { currentUser } = useAuth();

    const hasLiked = post?.likes?.some(like => like.userId === currentUser?.uid);
    const isLoadingLike = isLiking || isUnliking;

    const handleLike = async () => {
        if (!currentUser) {
            alert("Please log in to like posts");
            return;
        }

        setIsLikeAnimating(true);
        try {
            if (hasLiked) {
                await removeLike({ postId, userId: currentUser.uid }).unwrap();
            } else {
                await addLike({ postId, userId: currentUser.uid }).unwrap();
            }
        } catch (error) {
            console.error('Like operation failed:', error);
            alert(error.data?.error || 'Failed to process like action');
        }
        setTimeout(() => setIsLikeAnimating(false), 1000);
    };

    const handleShare = async (platform) => {
        const shareUrl = window.location.href;
        const shareTitle = post.title;
        const shareText = `Check out this post: ${post.title}`;

        switch (platform) {
            case 'native':
                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: shareTitle,
                            text: shareText,
                            url: shareUrl,
                        });
                    } catch (err) {
                        console.log('Error sharing:', err);
                    }
                } else {
                    setShowShareMenu(true);
                }
                break;
            case 'twitter':
                window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
                    '_blank'
                );
                break;
            case 'facebook':
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    '_blank'
                );
                break;
            case 'whatsapp':
                window.open(
                    `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
                    '_blank'
                );
                break;
            case 'copy':
                try {
                    await navigator.clipboard.writeText(shareUrl);
                    alert('Link copied to clipboard!');
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
                break;
        }
        setShowShareMenu(false);
    };

    const handleComment = async () => {
        if (!currentUser) {
            alert("Please log in to comment");
            return;
        }
    
        if (!commentText.trim()) {
            alert("Please enter a comment");
            return;
        }
    
        try {
            const authorName = currentUser.email 
                ? currentUser.email.split('@')[0] 
                : currentUser.uid.slice(0, 8);
            
            const userDisplayName = currentUser.displayName || authorName;
    
            const commentData = {
                postId,
                content: commentText.trim(),
                userId: currentUser.uid,
                authorName,
                userDisplayName,
                categories: post.categories || 'Uncategorized',
                createdAt: new Date().toISOString()
            };
    
            const response = await addComment(commentData).unwrap();
            console.log('Comment added successfully:', response);
    
            setCommentText('');
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Failed to add comment.");
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
    
    if (error || !post) return (
        <div className="max-w-3xl mx-auto p-4 mt-24">
            <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-red-500">{error ? error.message : 'Post not found'}</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden mt-10 transition-all duration-300 hover:shadow-2xl">
            <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 transition-colors duration-300">
                    {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                        <User size={18} />
                        <span className="text-sm">{post.authorName || 'Anonymous'}</span>
                        <Calendar size={18} />
                        <span className="text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    {post.categories && (
                        <div className="flex items-center gap-2 ml-auto">
                            <Tag size={18} className="text-blue-500" />
                            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                                {post.categories}
                            </span>
                        </div>
                    )}
                </div>
                
                <div className="relative w-full h-72 md:h-96 mb-8 rounded-xl overflow-hidden group">
                    <img 
                        src={post.image || post.imageUrl}
                        alt={post.title} 
                        className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-image.jpg';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                <div 
                    className="prose prose-lg max-w-none mb-8 prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline" 
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="flex items-center gap-6 mb-8">
                    <button
                        onClick={handleLike}
                        disabled={isLoadingLike}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 
                            ${hasLiked 
                                ? 'bg-red-500 hover:bg-red-600 text-white' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            } ${isLoadingLike ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <Heart 
                            className={`transition-all duration-300 ${isLikeAnimating ? 'scale-150' : ''}`}
                            size={20}
                            fill={hasLiked ? "currentColor" : "none"}
                        />
                        <span className="hidden sm:inline font-medium">{hasLiked ? 'Unlike' : 'Like'}</span>
                        <span className="ml-1 font-medium">({post.likes?.length || 0})</span>
                    </button>

                    <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-gray-600">
                        <MessageCircle size={20} />
                        <span className="font-medium">({post.comments?.length || 0})</span>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => handleShare('native')}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-300"
                        >
                            <Share2 size={20} />
                            <span className="hidden sm:inline font-medium">Share</span>
                        </button>

                        {showShareMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 py-2 border border-gray-200">
                                <button
                                    onClick={() => handleShare('twitter')}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                                >
                                    <Twitter size={18} className="text-blue-400" />
                                    Twitter
                                </button>
                                <button
                                    onClick={() => handleShare('facebook')}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                                >
                                    <Facebook size={18} className="text-blue-600" />
                                    Facebook
                                </button>
                                <button
                                    onClick={() => handleShare('whatsapp')}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                                >
                                    <span className="text-green-500">WhatsApp</span>
                                </button>
                                <button
                                    onClick={() => handleShare('copy')}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                                >
                                    <LinkIcon size={18} className="text-gray-600" />
                                    Copy Link
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <hr className="my-8 border-gray-200" />

                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
                        <MessageCircle size={24} />
                        Comments ({post.comments?.length || 0})
                    </h3>
                    
                    <div className="space-y-4">
                        {post.comments?.length > 0 ? (
                            post.comments.map((comment, index) => (
                                <div 
                                    key={index} 
                                    className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-slideUp"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                            {(comment.userDisplayName || 'A')[0].toUpperCase()}
                                        </div>
                                        <p className="font-medium text-gray-700">
                                            {comment.userDisplayName || 'Anonymous'}
                                        </p>
                                    </div>
                                    <p className="text-gray-600 ml-10">{comment.content}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-6 italic">No comments yet. Be the first to comment!</p>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="flex flex-col sm:flex-row gap-3 mt-8">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                            <button
                                onClick={handleComment}
                                className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 font-medium"
                            >
                                Post Comment
                            </button>
                        </div>
                    ) : (
                        <div className="text-center mt-8">
                            <Link 
                                to="/login"
                                className="inline-block px-8 py-3 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 font-medium"
                            >
                                Login to comment
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SinglePost;