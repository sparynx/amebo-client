import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const [message, setMessage] = useState("");
  const { registerUser, signInWithGoogle, signInWithFacebook } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      Swal.fire("Success!", "You have been registered successfully", "success");
      navigate("/");
    } catch (error) {
      setMessage("Error: " + error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      setMessage("Google Sign-In failed: " + error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
      navigate("/");
    } catch (error) {
      setMessage("Facebook Sign-In failed: " + error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <img 
          src="/image2.jpg" 
          alt="Blog Signup" 
          className="w-full max-h-[500px] object-cover md:max-w-lg"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Create an Account</h2>
          <p className="text-lg mb-10 text-gray-600">Join our blogging community!</p>

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

          {/* Signup Button */}
          <div className="mb-6">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-10 rounded w-full">
              Sign Up
            </button>
          </div>

          {/* Google Sign-In */}
          <div className="mb-3">
            <button 
              type="button" 
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 border border-gray-500 text-black py-2 px-6 w-full rounded hover:bg-gray-100"
            >
              <FcGoogle size={24} /> Sign up with Google
            </button>
          </div>

          {/* Facebook Sign-In */}
          <div className="mb-6">
            <button 
              type="button" 
              onClick={handleFacebookSignIn}
              className="flex items-center justify-center gap-2 border border-gray-500 text-black py-2 px-6 w-full rounded hover:bg-gray-100"
            >
              <FaFacebook size={24} className="text-blue-500" /> Sign up with Facebook
            </button>
          </div>

          {/* Already have an account */}
          <p className="text-center text-sm mt-4">
            Already have an account? 
            <Link to="/login" className="text-blue-600 hover:underline ml-1">Log in</Link>
          </p>

          <p className="text-gray-800 text-center text-xs mt-4">
            By signing up, you agree to our <Link className='text-blue-500 hover:text-blue-600' to="/terms-and-conditions">Terms & conditions</Link>
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

export default Register;
