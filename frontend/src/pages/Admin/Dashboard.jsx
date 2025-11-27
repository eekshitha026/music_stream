import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({ admins: 0, users: 0, songs: 0, playlists: 0, likes: 0 });
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      setError('');
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Failed to load stats');
        } else {
          setStats({
            admins: Number(data.admins) || 0,
            users: Number(data.users) || 0,
            songs: Number(data.songs) || 0,
            playlists: Number(data.playlists) || 0,
            likes: Number(data.likes) || 0
          });
        }
      } catch {
        setError('Network error');
      }
    };
    loadStats();
    const loadUsers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        if (res.ok) setUsers(Array.isArray(data) ? data : []);
      } catch {}
    };
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Platform overview</p>
        </div>
        <Link 
          to="/admin/songs" 
          className="bg-spotify-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors"
        >
          Add Song
        </Link>
      </div>

      {error && (
        <div className="bg-red-600 text-white p-3 rounded-md text-sm mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Admins</p>
          <p className="text-2xl font-bold text-white">{stats.admins}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Users</p>
          <p className="text-2xl font-bold text-white">{stats.users}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Songs</p>
          <p className="text-2xl font-bold text-white">{stats.songs}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Playlists</p>
          <p className="text-2xl font-bold text-white">{stats.playlists}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Likes</p>
          <p className="text-2xl font-bold text-white">{stats.likes}</p>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Users</h2>
          <span className="text-gray-400 text-sm">{users.length}</span>
        </div>
        <div className="space-y-3">
          {users.length === 0 ? (
            <p className="text-gray-400">No users found</p>
          ) : (
            users.map(u => (
              <div key={u.id} className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{u.firstName} {u.lastName}</p>
                  <p className="text-gray-400 text-sm">{u.email}</p>
                </div>
                <button
                  onClick={async () => {
                    const res = await fetch(`/api/admin/users/${u.id}`, { method: 'DELETE' }).catch(() => null);
                    if (res && res.ok) setUsers(prev => prev.filter(x => x.id !== u.id));
                  }}
                  className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
