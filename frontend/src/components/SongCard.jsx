import React, { useState } from 'react';
import { PlayIcon, HeartIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

const SongCard = ({ song, onPlay, onToggleLike, onAddToPlaylist, liked = false, className = '' }) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [isHovered, setIsHovered] = useState(false);

  const toggleLike = (e) => {
    e.stopPropagation();
    const next = !isLiked;
    setIsLiked(next);
    if (onToggleLike) {
      onToggleLike(song, next);
    }
  };

  const handlePlay = () => {
    if (onPlay) {
      onPlay(song);
    }
  };

  return (
    <div 
      className={`bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-all cursor-pointer group ${className}`}
      onClick={handlePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4">
        <img 
          src={song.cover || (song.coverImageBase64 ? `data:image/*;base64,${song.coverImageBase64}` : 'https://via.placeholder.com/300x300/1db954/ffffff?text=SONG')} 
          alt={song.title}
          className="w-full aspect-square object-cover rounded-md"
        />
        {isHovered && (
          <button 
            onClick={handlePlay}
            className="absolute bottom-2 right-2 bg-spotify-green text-black p-3 rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            <PlayIcon className="h-5 w-5 ml-0.5" />
          </button>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-white font-semibold truncate">{song.title}</h3>
        <p className="text-gray-400 text-sm truncate">{song.artist || song.movieName || ''}</p>
        {song.genre && (
          <p className="text-gray-500 text-xs truncate">{song.genre}</p>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        {song.duration && <span className="text-gray-500 text-xs">{song.duration}</span>}
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleLike}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isLiked ? (
              <HeartIcon className="h-4 w-4 text-spotify-green" />
            ) : (
              <HeartOutline className="h-4 w-4" />
            )}
          </button>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); if (onAddToPlaylist) onAddToPlaylist(song); }}
          >
            <EllipsisHorizontalIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
