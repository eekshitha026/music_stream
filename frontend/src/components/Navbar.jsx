import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  HomeIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = typeof window !== 'undefined' ? !!localStorage.getItem('userId') : false;
  const isAdmin = location.pathname.startsWith('/admin');
  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    if (isAdmin) {
      navigate('/admin/login');
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to={isAdmin ? "/admin/dashboard" : (isLoggedIn ? "/dashboard" : "/")} className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">♪</span>
          </div>
          <span className="text-white font-bold text-xl">
            {isAdmin ? 'Streamify Admin' : 'Streamify'}
          </span>
        </Link>

        {/* Search Bar - Only show on user side */}
        {!isAdmin && (
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search songs, artists, albums..."
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-spotify-green"
              />
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn && isHomePage ? (
            // Guest Navigation for Home Page
            <>
              <Link 
                to="/login" 
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-spotify-green text-black rounded-full hover:bg-green-600 transition-colors font-medium"
              >
                Sign Up
              </Link>
              <Link 
                to="/admin" 
                className="px-3 py-2 text-xs text-gray-400 hover:text-gray-300 transition-colors border border-gray-600 rounded"
              >
                Admin
              </Link>
            </>
          ) : isAdmin ? (
            // Admin Navigation
            <>
              <Link 
                to="/admin/dashboard" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/admin/dashboard' 
                    ? 'bg-spotify-green text-black' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <HomeIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            // User Navigation  
            <>
              <Link 
                to="/dashboard" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/dashboard' 
                    ? 'bg-spotify-green text-black' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <HomeIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/profile" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/profile' 
                    ? 'bg-spotify-green text-black' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <UserIcon className="h-5 w-5" />
                <span>Profile</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
