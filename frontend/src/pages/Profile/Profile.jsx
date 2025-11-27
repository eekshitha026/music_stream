import React, { useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: 'Music lover and playlist curator',
    country: 'United States',
    avatar: 'https://via.placeholder.com/150x150/1db954/ffffff?text=USER',
    joinDate: 'Recently',
    subscription: 'Free',
    publicPlaylists: 0,
    followers: 0,
    following: 0
  });

  const [editForm, setEditForm] = useState({ name: '' });

  useEffect(() => {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    if (!userId) return;
    const load = async () => {
      const res = await fetch(`/api/users/${userId}`).catch(() => null);
      if (!res) return;
      const data = await res.json();
      if (res.ok) {
        const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ').trim();
        setProfile((p) => ({
          ...p,
          name: fullName || data.email || 'User',
          email: data.email || '',
        }));
        setEditForm((f) => ({ ...f, name: fullName || 'User' }));
      }
    };
    load();
    (async () => {
      const fc = await fetch(`/api/users/${userId}/followers-count`).catch(() => null);
      const fgc = await fetch(`/api/users/${userId}/following-count`).catch(() => null);
      if (fc) { const d = await fc.json(); if (fc.ok) setProfile(p => ({ ...p, followers: Number(d.count) || 0 })); }
      if (fgc) { const d = await fgc.json(); if (fgc.ok) setProfile(p => ({ ...p, following: Number(d.count) || 0 })); }
    })();
  }, []);

  const handleEditToggle = () => {};

  const handleSave = () => {};

  const handleInputChange = () => {};

  const stats = [
    { label: 'Public Playlists', value: profile.publicPlaylists },
    { label: 'Followers', value: profile.followers },
    { label: 'Following', value: profile.following },
    { label: 'Member Since', value: profile.joinDate }
  ];

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Simplified */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-lg mb-8">
          <div className="text-center">
            <p className="text-sm uppercase tracking-wide text-purple-200 mb-2">Profile</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{profile.name || 'User'}</h1>
            <div className="text-purple-200 mb-2">{profile.email}</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-900 p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-spotify-green mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Basic Info */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-6">Account</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Full Name</label>
              <p className="text-white">{profile.name || 'User'}</p>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Email</label>
              <p className="text-white">{profile.email}</p>
            </div>
          </div>
        </div>

        {/* No extra sections */}
      </div>
    </div>
  );
};

export default Profile;
