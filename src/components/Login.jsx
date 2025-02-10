import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [message, setMessage] = useState("");
  const { loginUser, signInWithGoogle, signInWithFacebook } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      Swal.fire("Success!", "You have logged in successfully", "success");
      navigate("/");
    } catch (error) {
      setMessage("Error: " + error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      Swal.fire("login successful");
      navigate("/")
    } catch (error) {
      alert(error.message);
      console.error(error.message);
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <img 
          src="/image.jpg" 
          alt="Blog Login" 
          className="w-full max-h-[500px] object-cover md:max-w-lg"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome Back!</h2>
          <p className="text-lg mb-10 text-gray-600">Log in to your account</p>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input 
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border-b-2 border-gray-300 py-3 px-4 focus:outline-none focus:border-blue-500"
              {...register('email', { required: true })}
            />
            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input 
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full border-b-2 border-gray-300 py-3 px-4 focus:outline-none focus:border-blue-500"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && <span className="text-red-500 text-sm">Password must be at least 6 characters</span>}
          </div>

          {/* Login Button */}
          <div className="mb-6">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-10 rounded w-full">
              Sign In
            </button>
          </div>

          {/* Google Sign-In */}
          <div className="mb-3">
            <button 
              type="button" 
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 border border-gray-500 text-black py-2 px-6 w-full rounded hover:bg-gray-100"
            >
              <FcGoogle size={24} /> Sign in with Google
            </button>
          </div>

          {/* Facebook Sign-In */}
          <div className="mb-6">
            <button 
              type="button" 
              onClick={signInWithFacebook}
              className="flex items-center justify-center gap-2 border border-gray-500 text-black py-2 px-6 w-full rounded hover:bg-gray-100"
            >
              <FaFacebook size={24} className="text-blue-500" /> Sign in with Facebook
            </button>
          </div>

          {/* Don't have an account? */}
          <p className="text-center text-sm mt-4">
            Don&apos;t have an account? 
            <Link to="/register" className="text-blue-600 hover:underline ml-1">Sign up</Link>
          </p>

          <p className="text-gray-800 text-center text-xs mt-4">
            By signing in, you agree to our <Link className='text-blue-500 hover:text-blue-600' to="/terms-and-conditions">Terms & conditions</Link>
          </p>

          {/* Footer */}
          <p className="text-gray-800 text-center text-xs mt-4">
            Copyright &copy; 2025 Amebo<sup>®</sup>. All rights reserved.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
