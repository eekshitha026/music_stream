import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  MagnifyingGlassIcon,
  HeartIcon,
  RectangleStackIcon,
  UserGroupIcon,
  MusicalNoteIcon,
  CircleStackIcon,
  ChartBarIcon,
  UserIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const userNavItems = [
    { path: '/', name: 'Home', icon: HomeIcon },
    { path: '/explore', name: 'Explore', icon: MagnifyingGlassIcon },
    { path: '/playlists', name: 'Your Playlists', icon: RectangleStackIcon },
    { path: '/liked', name: 'Liked Songs', icon: HeartIcon },
    { path: '/users', name: 'Users', icon: UserGroupIcon },
  ];

  const adminNavItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: HomeIcon },
    { path: '/admin/songs', name: 'Manage Songs', icon: MusicalNoteIcon },
    { path: '/admin/albums', name: 'Manage Albums', icon: CircleStackIcon },
    { path: '/admin/artists', name: 'Manage Artists', icon: UserGroupIcon },
    { path: '/admin/users', name: 'Manage Users', icon: UserIcon },
    { path: '/admin/analytics', name: 'Analytics', icon: ChartBarIcon },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="w-64 bg-black h-screen pt-6 px-4 border-r border-gray-800">
      <div className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-spotify-green text-black'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`
            }
          >
            <item.icon className="h-6 w-6" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Recently Played - Only show on user side */}
      {!isAdmin && (
        <div className="mt-8">
          <h3 className="text-gray-400 text-sm font-medium px-4 mb-3">Recently Played</h3>
          <div className="space-y-2">
            {['Liked Songs', 'Chill Vibes', 'Pop Hits 2023'].map((item) => (
              <button
                key={item}
                className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg w-full text-left transition-colors"
              >
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <HeartIcon className="h-4 w-4" />
                </div>
                <span className="text-sm">{item}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
