import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useCreatePostMutation } from "../redux/features/BlogsApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { FolderIcon } from "lucide-react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";

const CATEGORIES = [
  "Technology",
  "Lifestyle",
  "Travel",
  "Food",
  "Health",
  "Business",
  "Entertainment",
  "Other"
];

const CreateNewPost = () => {
  const { currentUser } = useAuth();
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const IMGBB_API_KEY = "3dda8fe1464845f0da1de81a9cd67e27";

  if (!currentUser) {
    Swal.fire({
      title: "Login Required",
      text: "You must be logged in to create a post.",
      icon: "warning",
    });
    return <h2 className="text-center text-red-500"><Link to="/login">Please log in to create a post.</Link></h2>;
    
  }
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUpload(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageUpload) return null;
    setIsUploading(true);
  
    try {
      const formData = new FormData();
      formData.append("key", IMGBB_API_KEY);
      formData.append("image", imageUpload);
  
      const response = await axios.post(
        "https://api.imgbb.com/1/upload", 
        formData,
        { 
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
  
      setIsUploading(false);
      return response.data.data.url;
    } catch (error) {
      console.error("Detailed upload error:", error.response?.data || error.message);
      Swal.fire({ 
        title: "Upload Failed", 
        text: "There was an issue uploading your image.", 
        icon: "error" 
      });
      setIsUploading(false);
      return null;
    }
  };

const onSubmit = async (data) => {
  if (!data.title || !data.content || !data.category) {
    Swal.fire({ 
      title: "Missing Fields", 
      text: "Please fill in all required fields including category", 
      icon: "warning" 
    });
    return;
  }

  const imageUrl = await uploadImage();
  if (!imageUrl) {
    Swal.fire({ 
      title: "Image Required", 
      text: "Please upload an image for your post.", 
      icon: "warning" 
    });
    return;
  }

  const newPost = {
    title: data.title,
    content: data.content,
    categories: data.category,
    imageUrl: imageUrl,
    authorId: currentUser.uid,
    authorName: currentUser.email ? currentUser.email.split('@')[0] : "Anonymous",
  };

  try {
    await createPost(newPost).unwrap();
    reset();
    Swal.fire({ 
      title: "Success!", 
      text: "Your post has been published.", 
      icon: "success" 
    });
    navigate("/");
  } catch (error) {
    Swal.fire({ 
      title: "Error", 
      text: "Failed to create post. Please try again.", 
      icon: "error" 
    });
    console.error("Failed to create post:", error);
  }
};

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white border rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Drop New Gist</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Enter your post title"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Category Selection */}
        <div>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block">
            <div className="flex items-center gap-2 p-3 border border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <FolderIcon className="w-6 h-6 text-gray-400" />
              <span className="text-gray-600">Choose image file</span>
              <input type="file" onChange={handleImageChange} accept="image/*" className="hidden" />
            </div>
          </label>
          {previewUrl && <img src={previewUrl} alt="Preview" className="mt-2 max-h-40 rounded-lg object-cover" />}
        </div>

        {/* Rich Text Editor */}
        <div className="min-h-[300px]">
          <ReactQuill theme="snow" value={watch("content") || ""} onChange={(value) => setValue("content", value)} className="h-64" />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading || isLoading}
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-medium
                   hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400
                   disabled:cursor-not-allowed mt-2"
        >
          {isUploading ? "Uploading Image..." : isLoading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewPost;