import React from 'react'
import  { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from  "axios"
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom';
import getBaseUrl from "../utils/getBaseUrl"

const AdminLogin = () => {
      const [message, setMessage] = useState("");

     const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
      } = useForm()

        const navigate  = useNavigate()   

        const onSubmit = async (data) => {
            console.log(data)
          try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
              headers: {
                "Content-Type" : "application/json"
              }
            })
            const auth = await response.data

            if(auth.token) {
              localStorage.setItem("token", auth.token);
              setTimeout(() => {
                localStorage.removeItem("token");
                alert("token has expired. Please refresh the page to login again")
                navigate("/")
              }, 3600 * 1000);
            }

            Swal.fire("success")
            navigate("/dashboard")

            // navigate("/");
          } catch (error) {
            setMessage("Please enter a valid email address and password", error.message);
            Swal.fire("ACCESS DENIED!");
          }
        } 



  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* left side */}
      <div className="flex items-start justify-start w-full md:w-1/2">
        <img src="/image.jpg" alt="Side" className="w-full h-auto" />
      </div>

      {/* right side */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mb-8 pb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Admin Login</h2>
        <p className="text-lg mb-20 text-gray-600 ">Enter your details here</p>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Username</label>
            <input type="username"
              name="username" id="username" placeholder='USERNAME' 
              className='appearance-none border-b-2 border-gray-300 w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500'  
              {...register('username', { required: true })}
            />
            {errors.email && <span className="text-blue-500 text-sm">This field is required</span>}
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
            <input type="password"
              name="password" id="password" placeholder='Password' 
              className='appearance-none border-b-2 border-gray-300 w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500'  
              {...register('password', { required: true })}
            />
            {errors.password && <span className="text-blue-500 text-sm">This field is required</span>}
          </div>
          <div className="mb-6">
            <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white py-3 px-10 rounded focus:outline-none w-full'>
              Login
            </button>
          </div>

                      {/* google sign in button */}



          
            <p className='text-gray-800  mt-4 text-center text-xs'>Copyright &copy; 2025 Amebo<sup>®</sup>. All rights reserved.</p>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin