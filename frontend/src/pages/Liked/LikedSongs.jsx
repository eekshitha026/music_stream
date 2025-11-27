import React, { useEffect, useRef, useState } from 'react';
import { PlayIcon, HeartIcon as HeartSolid, ClockIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
// Replace dummy liked songs with backend

const LikedSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const audioRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      if (!userId) { setLoading(false); return; }
      setError('');
      setLoading(true);
      try {
        const res = await fetch(`/api/users/${userId}/likes`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Failed to load liked songs');
        } else {
          setSongs(Array.isArray(data) ? data : []);
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  const handlePlayAll = () => {
    const audio = audioRef.current;
    if (!audio || songs.length === 0) return;
    let src = songs[0].filePath || '';
    if (src.startsWith('/media')) src = `http://localhost:8080${src}`;
    audio.src = src;
    audio.play().catch(() => {});
  };

  const handlePlaySong = (song) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (song.filePath) {
      const url = song.filePath.startsWith('/media') ? `http://localhost:8080${song.filePath}` : song.filePath;
      audio.src = url;
      audio.play().catch(() => {});
    }
  };

  const handleUnlike = async (songId) => {
    if (!userId) return;
    await fetch(`/api/songs/${songId}/like?userId=${userId}`, { method: 'DELETE' });
    setSongs(songs.filter(s => s.id !== songId));
  };

  const totalDuration = 0;

  const formatTotalDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-600 to-purple-900 p-8 rounded-lg mb-8">
        <div className="flex items-end space-x-6">
          <div className="w-48 h-48 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
            <HeartSolid className="h-24 w-24 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm uppercase tracking-wide text-purple-200 mb-2">Playlist</p>
            <h1 className="text-5xl font-bold mb-4">Liked Songs</h1>
            <div className="flex items-center space-x-2 text-purple-200">
              <span className="font-semibold">You</span>
              <span>•</span>
              <span>{songs.length} songs</span>
              <span>•</span>
              <span>{formatTotalDuration(totalDuration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-6 mb-8">
        <button 
          onClick={handlePlayAll}
          className="bg-spotify-green text-black p-4 rounded-full hover:scale-105 transition-transform"
          disabled={songs.length === 0}
        >
          <PlayIcon className="h-6 w-6 ml-1" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <EllipsisHorizontalIcon className="h-8 w-8" />
        </button>
      </div>

      {/* Songs List */}
      {songs.length > 0 ? (
        <div className="space-y-2">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-gray-400 text-sm border-b border-gray-800">
            <div className="col-span-1">#</div>
            <div className="col-span-5">TITLE</div>
            <div className="col-span-3">ALBUM</div>
            <div className="col-span-2">DATE ADDED</div>
            <div className="col-span-1 text-right">
              <ClockIcon className="h-4 w-4 ml-auto" />
            </div>
          </div>

          {/* Songs */}
          {loading ? (
            <div className="text-gray-400 px-4 py-3">Loading...</div>
          ) : songs.map((song, index) => (
            <div 
              key={song.id}
              className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-800 rounded-lg group cursor-pointer transition-colors"
              onClick={() => handlePlaySong(song)}
            >
              <div className="col-span-1 flex items-center">
                <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                <PlayIcon className="h-4 w-4 text-white hidden group-hover:block" />
              </div>
              
              <div className="col-span-5 flex items-center space-x-3">
                <img 
                  src={song.cover || (song.coverImageBase64 ? `data:image/*;base64,${song.coverImageBase64}` : 'https://via.placeholder.com/100x100/1db954/ffffff?text=SONG')} 
                  alt={song.title}
                  className="w-10 h-10 rounded"
                />
                <div>
                  <p className="text-white font-medium truncate">{song.title}</p>
                  <p className="text-gray-400 text-sm truncate">{song.movieName || ''}</p>
                </div>
              </div>
              
              <div className="col-span-3 flex items-center">
                <p className="text-gray-400 text-sm truncate">{song.genre || ''}</p>
              </div>
              
              <div className="col-span-2 flex items-center">
                <p className="text-gray-400 text-sm">Recently</p>
              </div>
              
              <div className="col-span-1 flex items-center justify-end space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnlike(song.id);
                  }}
                  className="text-spotify-green hover:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <HeartSolid className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <EllipsisHorizontalIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <HeartOutline className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No liked songs yet</h3>
          <p className="text-gray-400 mb-6">Songs you like will appear here</p>
          <button className="bg-spotify-green text-black px-6 py-3 rounded-full font-semibold hover:bg-green-400 transition-colors">
            Find songs to like
          </button>
        </div>
      )}
      <audio ref={audioRef} hidden />
    </div>
  );
};

export default LikedSongs;
