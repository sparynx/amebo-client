import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFetchAllPostsQuery, useDeletePostMutation } from '../redux/features/BlogsApi';
import { LogOut, Trash2, ExternalLink, Loader } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [deleteError, setDeleteError] = useState('');
  const { data: posts, error, isLoading } = useFetchAllPostsQuery();
  const [deletePost] = useDeletePostMutation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  const handleDelete = async (postId) => {
    try {
      setDeleteError('');
      await deletePost(postId).unwrap();
    } catch (error) {
      console.error('Error deleting post:', error);
      setDeleteError('Failed to delete post. Please try again.');
      
      if (error.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin');
      }
    }
  };

  if (isLoading) {
    return <Loader/>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            Error loading posts. Please try again later.
          </div>
        )}

        {deleteError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {deleteError}
          </div>
        )}

        <div className="space-y-4">
          {posts?.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-medium text-gray-900">
                    {post.title || 'Untitled Post'}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/post/${post._id}`}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Inspect
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {post.content?.substring(0, 150)}
                  {post.content?.length > 150 ? '...' : ''}
                </p>
                <div className="mt-2 flex gap-4 text-sm text-gray-500">
                  <span>{post.comments?.length || 0} comments</span>
                  <span>{post.likes?.length || 0} likes</span>
                </div>
              </div>
            </div>
          ))}

          {posts?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No posts found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;