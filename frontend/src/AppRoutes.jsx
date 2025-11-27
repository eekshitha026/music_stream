import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Landing and Dashboard Pages
import LandingHome from './pages/Home/LandingHome';
import UserDashboard from './pages/Home/UserDashboard';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// User Pages
import Explore from './pages/Explore/Explore';
import Playlists from './pages/Playlist/Playlists';
import LikedSongs from './pages/Liked/LikedSongs';
import AlbumDetails from './pages/Album/AlbumDetails';
import ArtistDetails from './pages/Artist/ArtistDetails';
import Profile from './pages/Profile/Profile';
import Users from './pages/Users/Users';

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin';
import Dashboard from './pages/Admin/Dashboard';
import ManageSongs from './pages/Admin/ManageSongs';
import ManageAlbums from './pages/Admin/ManageAlbums';
import ManageArtists from './pages/Admin/ManageArtists';
import ManageUsers from './pages/Admin/ManageUsers';
import Analytics from './pages/Admin/Analytics';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing and Auth Routes */}
      <Route path="/" element={<LandingHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* User Routes */}
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/liked" element={<LikedSongs />} />
      <Route path="/album/:id" element={<AlbumDetails />} />
      <Route path="/artist/:id" element={<ArtistDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/users" element={<Users />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/songs" element={<ManageSongs />} />
      <Route path="/admin/albums" element={<ManageAlbums />} />
      <Route path="/admin/artists" element={<ManageArtists />} />
      <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/admin/analytics" element={<Analytics />} />
    </Routes>
  );
};

export default AppRoutes;
