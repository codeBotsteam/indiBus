import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <Link to="/">
        <span className="text-4xl">🚌
        </span>
        <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          IndiBus
        </span>
        
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className="text-gray-700 dark:text-gray-200 font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-200"></span>
          </Link>
          <Link 
            to="/plan" 
            className="text-gray-700 dark:text-gray-200 font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 relative group"
          >
            Plan Trip
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-200"></span>
          </Link>
          <Link 
            to="/tracking" 
            className="text-gray-700 dark:text-gray-200 font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 relative group"
          >
            Live Tracking
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-200"></span>
          </Link>
          <Link 
            to="/rewards" 
            className="text-gray-700 dark:text-gray-200 font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 relative group"
          >
            Rewards
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-200"></span>
          </Link>
        </div>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:scale-105 transition-transform duration-200 shadow-md"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Mobile menu icon */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;