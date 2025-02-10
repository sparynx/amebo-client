import React from "react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setShowTooltip(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="fixed bottom-0 right-0 p-4 sm:p-6 z-50">
      <Link
        to="/newblogs"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`relative inline-flex items-center justify-center rounded-full bg-blue-600 p-3 sm:p-4 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        aria-label="Add new Gists"
      >
        <Plus className="h-6 w-6 sm:h-7 sm:w-7" />
        
        {/* Desktop Tooltip */}
        <span 
          className={`hidden sm:block absolute right-full mr-3 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-sm text-white transition-opacity duration-200
            ${showTooltip && isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          Create New Blog
        </span>
      </Link>
    </div>
  );
}

export default FloatingActionButton