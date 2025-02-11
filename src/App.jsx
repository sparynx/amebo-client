import React from 'react';
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './components/NotificationProvider';

function App() {

  return (
    <>
     <AuthProvider>
      <NotificationProvider>
      <Navbar/>
        <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
          <Outlet/>
        </main>
      <Footer/>
      </NotificationProvider>
      </AuthProvider>
    </>
  )
}

export default App
