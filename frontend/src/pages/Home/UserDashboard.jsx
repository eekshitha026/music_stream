import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SongCard from '../../components/SongCard';
import PlaylistCard from '../../components/PlaylistCard';

const UserDashboard = () => {
  const [songs, setSongs] = useState([]);
  const [genreFilter, setGenreFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [likedIds, setLikedIds] = useState([]);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  
  const featuredPlaylists = [];

  useEffect(() => {
    const loadSongs = async () => {
      setError('');
      try {
        const params = new URLSearchParams();
        if (genreFilter) params.append('genre', genreFilter);
        if (typeFilter) params.append('type', typeFilter);
        const res = await fetch(`/api/songs?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Failed to load songs');
        } else {
          setSongs(Array.isArray(data) ? data : []);
        }
      } catch {
        setError('Network error');
      }
    };
    loadSongs();
  }, [genreFilter, typeFilter]);

  useEffect(() => {
    const loadPlaylists = async () => {
      if (!userId) return;
      const res = await fetch(`/api/users/${userId}/playlists`).catch(() => null);
      if (!res) return;
      const data = await res.json();
      if (res.ok) setPlaylists(Array.isArray(data) ? data : []);
    };
    loadPlaylists();
  }, [userId]);

  useEffect(() => {
    const loadLikes = async () => {
      if (!userId) return;
      const res = await fetch(`/api/users/${userId}/likes`).catch(() => null);
      if (!res) return;
      const data = await res.json();
      if (res.ok) setLikedIds((Array.isArray(data) ? data : []).map(s => s.id));
    };
    loadLikes();
  }, [userId]);

  const filteredSongs = songs.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    (s.movieName || '').toLowerCase().includes(search.toLowerCase())
  );

  const audioRef = React.useRef(null);
  const handlePlaySong = (song) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (song.filePath) {
      const url = song.filePath.startsWith('/media') ? `http://localhost:8080${song.filePath}` : song.filePath;
      audio.src = url;
      audio.play().catch(() => {});
    }
  };

  const handlePlayPlaylist = (playlist) => {
    console.log('Playing playlist:', playlist.title);
  };

  const handlePlayArtist = (artist) => {
    console.log('Playing artist:', artist.name);
  };

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
        <p className="text-gray-200 text-lg">Ready to discover some great music today?</p>
      </div>

      {/* Library Filters */}
      <section className="mb-8">
        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or movie"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
            />
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-md"
            >
              <option value="">All Genres</option>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="R&B">R&B</option>
              <option value="Electronic">Electronic</option>
              <option value="Jazz">Jazz</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-md"
            >
              <option value="">All Types</option>
              <option value="Movie">Movie</option>
              <option value="Album">Album</option>
              <option value="Single">Single</option>
            </select>
            <div className="text-gray-400 flex items-center">Total: {filteredSongs.length}</div>
          </div>
          {error && <div className="bg-red-600 text-white p-3 rounded-md text-sm mt-4">{error}</div>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSongs.map((song) => (
            <SongCard 
              key={song.id} 
              song={song} 
              onPlay={handlePlaySong}
              liked={likedIds.includes(song.id)}
              onToggleLike={async (s, next) => {
                if (!userId) return;
                const method = next ? 'POST' : 'DELETE';
                await fetch(`/api/songs/${s.id}/like?userId=${userId}`, { method });
                setLikedIds((prev) => {
                  const set = new Set(prev);
                  if (next) set.add(s.id); else set.delete(s.id);
                  return Array.from(set);
                });
              }}
              onAddToPlaylist={async (s) => {
                if (!userId) return;
                let target = playlists[0];
                if (!target) {
                  const createdRes = await fetch(`/api/users/${userId}/playlists`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: 'Favorites' })
                  }).catch(() => null);
                  if (!createdRes) return;
                  const created = await createdRes.json();
                  if (!createdRes.ok) return;
                  setPlaylists([created]);
                  target = created;
                }
                await fetch(`/api/users/${userId}/playlists/${target.id}/items`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ songId: s.id })
                });
              }}
            />
          ))}
        </div>
      </section>
      <audio ref={audioRef} hidden />

      {/* Featured Playlists placeholder */}

      {/* Featured Playlists */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Playlists</h2>
          <Link to="/playlists" className="text-spotify-green hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredPlaylists.map((playlist) => (
            <PlaylistCard 
              key={playlist.id} 
              playlist={playlist} 
              onPlay={handlePlayPlaylist}
            />
          ))}
        </div>
      </section>

      {/* Recommended Artists removed for now */}

      {/* Quick Actions */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link 
          to="/explore" 
          className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h3 className="text-xl font-bold mb-2">Explore Music</h3>
          <p className="text-gray-200">Discover new songs and artists</p>
        </Link>
        <Link 
          to="/playlists" 
          className="bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h3 className="text-xl font-bold mb-2">My Playlists</h3>
          <p className="text-gray-200">Manage your music collections</p>
        </Link>
        <Link 
          to="/liked" 
          className="bg-gradient-to-r from-pink-600 to-purple-600 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h3 className="text-xl font-bold mb-2">Liked Songs</h3>
          <p className="text-gray-200">Your favorite tracks</p>
        </Link>
        <Link 
          to="/profile" 
          className="bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h3 className="text-xl font-bold mb-2">Profile</h3>
          <p className="text-gray-200">View your music stats</p>
        </Link>
      </section>
    </div>
  );
};

export default UserDashboard;
