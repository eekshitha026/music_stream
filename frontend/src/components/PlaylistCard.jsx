import React from 'react';
import { PlayIcon, UserGroupIcon } from '@heroicons/react/24/solid';

const PlaylistCard = ({ playlist, onPlay, className = '' }) => {
  const handlePlay = () => {
    if (onPlay) {
      onPlay(playlist);
    }
  };

  return (
    <div 
      className={`bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-all cursor-pointer group ${className}`}
      onClick={handlePlay}
    >
      <div className="relative mb-4">
        <img 
          src={playlist.cover} 
          alt={playlist.title}
          className="w-full aspect-square object-cover rounded-md"
        />
        <button 
          onClick={handlePlay}
          className="absolute bottom-2 right-2 bg-spotify-green text-black p-3 rounded-full hover:scale-105 transition-transform shadow-lg opacity-0 group-hover:opacity-100"
        >
          <PlayIcon className="h-5 w-5 ml-0.5" />
        </button>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-white font-semibold truncate">{playlist.title}</h3>
        <p className="text-gray-400 text-sm truncate">{playlist.description}</p>
        <div className="flex items-center space-x-2 text-gray-500 text-xs">
          <span>By {playlist.owner}</span>
          {playlist.followers > 0 && (
            <>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <UserGroupIcon className="h-3 w-3" />
                <span>{playlist.followers.toLocaleString()}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;