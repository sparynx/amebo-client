import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Calendar, Clock } from 'lucide-react';
import { useGetLikesQuery, useGetCommentsQuery } from '../redux/features/BlogsApi';

const ProfilePage = () => {
  const { data: likes = [] } = useGetLikesQuery();
  const { data: comments = [] } = useGetCommentsQuery();
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <h2 className="text-2xl font-semibold text-gray-900">Not Signed In</h2>
          <p className="mt-2 text-gray-600">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  // Get the Google profile image or fallback to the default one
  const googleProfileImage = currentUser.providerData?.[0]?.photoURL;

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="h-32 sm:h-48 w-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl" />
          <div className="absolute -bottom-12 sm:-bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-xl">
              {googleProfileImage || currentUser.photoURL ? (
                <img
                  src={googleProfileImage || currentUser.photoURL}
                  alt={currentUser.displayName || 'Profile'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl sm:text-4xl font-bold text-blue-500">
                    {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 bg-white rounded-xl shadow-sm px-4 sm:px-8 py-6">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {currentUser.displayName || 'Anonymous User'}
            </h1>
            {currentUser.email && (
              <div className="flex items-center justify-center mt-2 text-gray-600 text-sm sm:text-base">
                <Mail size={16} className="mr-2" />
                <span>{currentUser.email}</span>
              </div>
            )}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center text-gray-700 text-sm sm:text-base">
                <Calendar size={18} className="mr-3 flex-shrink-0" />
                <span>Joined {currentUser.metadata?.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString() : 'Unknown'}</span>
              </div>
              {currentUser.emailVerified && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                  ✓ Verified Account
                </div>
              )}
            </div>

            <div className="mt-8 space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock size={20} className="text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                </div>
                <div className="text-gray-600">
                  <div className="flex items-center">
                    <span>Last active: {currentUser.metadata?.lastSignInTime 
                      ? new Date(currentUser.metadata.lastSignInTime).toLocaleString() 
                      : 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
