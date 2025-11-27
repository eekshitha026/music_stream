import React from 'react';
import { PlayIcon, UserGroupIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

const ArtistCard = ({ artist, onPlay, className = '' }) => {
  const handlePlay = () => {
    if (onPlay) {
      onPlay(artist);
    }
  };

  return (
    <div 
      className={`bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-all cursor-pointer group ${className}`}
      onClick={handlePlay}
    >
      <div className="relative mb-4">
        <img 
          src={artist.image} 
          alt={artist.name}
          className="w-full aspect-square object-cover rounded-full"
        />
        <button 
          onClick={handlePlay}
          className="absolute bottom-2 right-2 bg-spotify-green text-black p-3 rounded-full hover:scale-105 transition-transform shadow-lg opacity-0 group-hover:opacity-100"
        >
          <PlayIcon className="h-5 w-5 ml-0.5" />
        </button>
      </div>
      
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center space-x-1">
          <h3 className="text-white font-semibold truncate">{artist.name}</h3>
          {artist.verified && (
            <CheckBadgeIcon className="h-4 w-4 text-blue-500" />
          )}
        </div>
        <p className="text-gray-400 text-sm">Artist</p>
        <div className="flex items-center justify-center space-x-1 text-gray-500 text-xs">
          <UserGroupIcon className="h-3 w-3" />
          <span>{artist.followers.toLocaleString()} followers</span>
        </div>
        {artist.genres && artist.genres.length > 0 && (
          <p className="text-gray-500 text-xs truncate">
            {artist.genres.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
};

export default ArtistCard;