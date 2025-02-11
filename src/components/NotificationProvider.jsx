import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL || 'https://amebo-server.onrender.com', {
  withCredentials: true
});

export const NotificationProvider = ({ children }) => {
  const [audio] = useState(() => typeof Audio !== 'undefined' ? new Audio('/notification.wav') : null);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  // Sound playback function
  const playNotificationSound = useCallback(() => {
    if (audio && notificationEnabled) {
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.warn('Audio playback failed:', error);
      });
    }
  }, [audio, notificationEnabled]);

  useEffect(() => {
    // Load sound preference from localStorage
    const savedPreference = localStorage.getItem('notificationSound');
    if (savedPreference !== null) {
      setNotificationEnabled(JSON.parse(savedPreference));
    }

    socket.on('newPost', (data) => {
      const { notification } = data;
      
      // Play sound when notification arrives
      playNotificationSound();
      
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ), {
        duration: 4000,
        position: 'top-right',
      });
    });

    return () => {
      socket.off('newPost');
      socket.disconnect();
    };
  }, [playNotificationSound]);

  // Add a simple sound toggle button
  const SoundToggle = () => (
    <div className="fixed bottom-4 right-4 bg-white p-2 rounded-full shadow-lg">
      <button
        onClick={() => {
          setNotificationEnabled(!notificationEnabled);
          localStorage.setItem('notificationSound', JSON.stringify(!notificationEnabled));
        }}
        className="p-2 hover:bg-gray-100 rounded-full"
        title={notificationEnabled ? "Disable notification sound" : "Enable notification sound"}
      >
        {notificationEnabled ? '🔔' : '🔕'}
      </button>
    </div>
  );

  return (
    <>
      {children}
      <Toaster />
      <SoundToggle />
    </>
  );
};