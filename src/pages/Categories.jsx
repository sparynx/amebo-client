import React, { useState, useEffect, useRef } from 'react';
import { useFetchAllPostsQuery } from '../redux/features/BlogsApi';
import { gsap } from 'gsap';
import { ChevronDown, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const cardsRef = useRef([]);
    const { data: allPosts, isLoading } = useFetchAllPostsQuery();

    // Filter posts based on selected category
    useEffect(() => {
        if (allPosts) {
            if (selectedCategory === 'All') {
                setFilteredPosts(allPosts);
            } else {
                const filtered = allPosts.filter(post => post.categories === selectedCategory);
                setFilteredPosts(filtered);
            }
        }
    }, [selectedCategory, allPosts]);

    // GSAP animation for posts
    useEffect(() => {
        if (filteredPosts.length > 0) {
            // Reset refs array
            cardsRef.current = cardsRef.current.slice(0, filteredPosts.length);

            // Animate cards
            gsap.fromTo(
                cardsRef.current,
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power3.out"
                }
            );
        }
    }, [filteredPosts]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Updated Category Header */}
            <div className="flex flex-row justify-between items-center mb-12 gap-4">
                <h1 className="text-2xl sm:text-5xl font-bold text-gray-800 flex-shrink">
                    Browse by Category
                </h1>

                {/* Category Dropdown */}
                <div className="relative flex-shrink-0">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-all duration-300"
                    >
                        <span className="font-medium">{selectedCategory}</span>
                        <ChevronDown 
                            size={20} 
                            className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-10">
                            <button
                                onClick={() => {
                                    setSelectedCategory('All');
                                    setIsDropdownOpen(false);
                                }}
                                className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors duration-200
                                    ${selectedCategory === 'All' ? 'text-blue-500 font-medium' : 'text-gray-700'}`}
                            >
                                All
                            </button>
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors duration-200
                                        ${selectedCategory === category ? 'text-blue-500 font-medium' : 'text-gray-700'}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Posts Grid */}
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600">No posts found in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <Link
                            to={`/post/${post._id}`}
                            key={post._id}
                            ref={el => cardsRef.current[index] = el}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Post Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-full object-cover object-top transform hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/placeholder-image.jpg';
                                    }}
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                                        {post.categories}
                                    </span>
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                                    {post.title}
                                </h2>
                                <div className="text-gray-600 mb-4 line-clamp-3">
                                    {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                                </div>

                                {/* Post Metadata */}
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <User size={16} />
                                        <span>{post.authorName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} />
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Categories;