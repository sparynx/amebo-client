import React, { useState } from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { currentUser, logOut } = useAuth();

  const handleSignOut = () => {
    console.log("User signed out");
    logOut();
  };

  const getInitials = (email) => {
    if (!email) return "";
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Admin", href: "/admin" },
  ];

  const navHeight = isMobileMenuOpen ? "auto" : "h-16 sm:h-10"; // Dynamic height based on mobile menu state

  return (
    <>
      {/* Navbar Spacer - pushes content down */}
      <div className={`${navHeight} w-full`}></div>

      <nav className="bg-white shadow-sm fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <a href="/" className="text-4xl sm:text-5xl font-semibold text-blue-500 font-serif no-underline" style={{ fontFamily: 'Dancing Script' }}>
            Amebo
            <sup className="text-blue-500 text-sm">®</sup>
          </a>

          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-gray-700 text-[15px] font-light hover:text-blue-700 transition-all pb-3 group"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-500 scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400 text-sm" />
            </div>

            <div className="relative">
              {currentUser ? (
                <>
                  <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm">
                      {getInitials(currentUser.email)}
                    </div>
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-600 shadow-lg rounded-md z-50">
                      <ul className="py-2">
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-500"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleSignOut}
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-500 w-full text-left"
                          >
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" className="flex items-center space-x-1 hover:text-gray-500 text-gray-400 transition">
                  <FaUserCircle className="size-6" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
              )}
            </div>

            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md w-full py-4 px-4 sm:px-6">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400 text-sm" />
            </div>

            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-700 text-[15px] font-light hover:text-blue-700 block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}