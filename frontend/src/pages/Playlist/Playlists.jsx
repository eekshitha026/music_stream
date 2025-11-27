import React, { useEffect, useState } from 'react';
import { PlusIcon, PlayIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import PlaylistCard from '../../components/PlaylistCard';
// Replace dummy data with backend playlists

const Playlists = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddSongsModal, setShowAddSongsModal] = useState(false);
  const [availableSongs, setAvailableSongs] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  useEffect(() => {
    const load = async () => {
      if (!userId) { setLoading(false); return; }
      setError('');
      setLoading(true);
      try {
        const res = await fetch(`/api/users/${userId}/playlists`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Failed to load playlists');
        } else {
          setPlaylists(Array.isArray(data) ? data : []);
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  const userPlaylists = playlists;
  const featuredPlaylists = [];

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!userId) return;
    setError('');
    try {
      const res = await fetch(`/api/users/${userId}/playlists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newPlaylistName })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create playlist');
      } else {
        setPlaylists([data, ...playlists]);
        setShowCreateModal(false);
        setNewPlaylistName('');
        setNewPlaylistDescription('');
      }
    } catch {
      setError('Network error');
    }
  };

  const handlePlayPlaylist = (playlist) => {
    console.log('Playing playlist:', playlist.title);
  };

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Playlists</h1>
          <p className="text-gray-400">Create and manage your music collections</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-spotify-green text-black px-6 py-3 rounded-full font-semibold hover:bg-green-400 transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create Playlist</span>
          </button>
          <button 
            onClick={async () => {
              setShowAddSongsModal(true);
              try {
                const res = await fetch('/api/songs');
                const data = await res.json();
                if (res.ok) setAvailableSongs(Array.isArray(data) ? data : []);
              } catch {}
            }}
            className="bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition-colors"
          >
            Add Songs
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform">
          <div className="flex items-center space-x-3">
            <HeartIcon className="h-8 w-8" />
            <div>
              <h3 className="font-semibold">Liked Songs</h3>
              <p className="text-sm opacity-80">45 songs</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform">
          <div className="flex items-center space-x-3">
            <PlayIcon className="h-8 w-8" />
            <div>
              <h3 className="font-semibold">Recently Played</h3>
              <p className="text-sm opacity-80">Last 50 songs</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform">
          <div className="flex items-center space-x-3">
            <PlusIcon className="h-8 w-8" />
            <div>
              <h3 className="font-semibold">Create New</h3>
              <p className="text-sm opacity-80">Make a playlist</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform">
          <div className="flex items-center space-x-3">
            <EllipsisHorizontalIcon className="h-8 w-8" />
            <div>
              <h3 className="font-semibold">Discover</h3>
              <p className="text-sm opacity-80">Made for you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Playlists */}
      {userPlaylists.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Created by you</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {userPlaylists.map((playlist) => (
              <PlaylistCard 
                key={playlist.id} 
                playlist={{
                  id: playlist.id,
                  title: playlist.title,
                  cover: 'https://via.placeholder.com/300x300/1db954/ffffff?text=PL',
                  owner: 'You',
                  tracks: 0
                }} 
                onPlay={handlePlayPlaylist}
              />
            ))}
          </div>
        </section>
      )}

      {/* Featured Playlists */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Made for you</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featuredPlaylists.map((playlist) => (
            <PlaylistCard 
              key={playlist.id} 
              playlist={playlist} 
              onPlay={handlePlayPlaylist}
            />
          ))}
        </div>
      </section>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Create new playlist</h3>
            <form onSubmit={handleCreatePlaylist}>
              {error && <div className="bg-red-600 text-white p-3 rounded-md text-sm mb-3">{error}</div>}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Playlist name
                </label>
                <input
                  type="text"
                  required
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                  placeholder="My Awesome Playlist"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description (optional)
                </label>
                <textarea
                  value={newPlaylistDescription}
                  onChange={(e) => setNewPlaylistDescription(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                  placeholder="Add a description..."
                  rows="3"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-spotify-green text-black py-2 px-4 rounded-lg hover:bg-green-400 transition-colors font-semibold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddSongsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Add songs to playlist</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Select playlist</label>
              <select 
                value={selectedPlaylistId}
                onChange={(e) => setSelectedPlaylistId(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
              >
                <option value="">Choose a playlist</option>
                {playlists.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {availableSongs.length === 0 ? (
                <p className="text-gray-400">No songs available</p>
              ) : (
                availableSongs.map(s => (
                  <div key={s.id} className="flex items-center justify-between py-2 border-b border-gray-700">
                    <div>
                      <p className="text-white font-medium">{s.title}</p>
                      <p className="text-gray-400 text-sm">{s.movieName || ''} {s.genre ? `• ${s.genre}` : ''}</p>
                    </div>
                    <button
                      disabled={!selectedPlaylistId}
                      onClick={async () => {
                        if (!userId || !selectedPlaylistId) return;
                        await fetch(`/api/users/${userId}/playlists/${selectedPlaylistId}/items`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ songId: s.id })
                        });
                      }}
                      className="bg-spotify-green text-black px-3 py-2 rounded hover:bg-green-400 transition-colors disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button 
                onClick={() => setShowAddSongsModal(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlists;
