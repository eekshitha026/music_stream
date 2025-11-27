import React, { useState } from 'react';
import { 
  PlayIcon, 
  PauseIcon, 
  ForwardIcon, 
  BackwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsRightLeftIcon,
  ArrowPathIcon,
  HeartIcon
} from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

const BottomPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, _setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // off, one, all
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, _setCurrentTime] = useState(45);
  const [duration, _setDuration] = useState(200);

  // Mock current song
  const currentSong = {
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "https://via.placeholder.com/60x60/1db954/ffffff?text=BL"
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleShuffle = () => setIsShuffled(!isShuffled);
  const toggleLike = () => setIsLiked(!isLiked);

  const toggleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-3 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Song Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <img 
            src={currentSong.cover} 
            alt={currentSong.title}
            className="w-14 h-14 rounded-lg"
          />
          <div className="min-w-0">
            <h4 className="text-white font-medium truncate">{currentSong.title}</h4>
            <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
          </div>
          <button 
            onClick={toggleLike}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isLiked ? (
              <HeartIcon className="h-5 w-5 text-spotify-green" />
            ) : (
              <HeartOutline className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleShuffle}
              className={`p-2 rounded-full transition-colors ${
                isShuffled ? 'text-spotify-green' : 'text-gray-400 hover:text-white'
              }`}
            >
              <ArrowsRightLeftIcon className="h-4 w-4" />
            </button>
            
            <button className="text-gray-400 hover:text-white transition-colors">
              <BackwardIcon className="h-6 w-6" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="bg-white text-black p-3 rounded-full hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <PauseIcon className="h-6 w-6" />
              ) : (
                <PlayIcon className="h-6 w-6 ml-1" />
              )}
            </button>
            
            <button className="text-gray-400 hover:text-white transition-colors">
              <ForwardIcon className="h-6 w-6" />
            </button>
            
            <button 
              onClick={toggleRepeat}
              className={`p-2 rounded-full transition-colors ${
                repeatMode !== 'off' ? 'text-spotify-green' : 'text-gray-400 hover:text-white'
              }`}
            >
              <ArrowPathIcon className="h-4 w-4" />
              {repeatMode === 'one' && (
                <span className="absolute -top-1 -right-1 bg-spotify-green text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
              )}
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-3 w-full">
            <span className="text-gray-400 text-xs">{formatTime(currentTime)}</span>
            <div className="flex-1 bg-gray-600 h-1 rounded-full">
              <div 
                className="bg-white h-1 rounded-full relative" 
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-gray-400 text-xs">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3 flex-1 justify-end">
          <button 
            onClick={toggleMute}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? (
              <SpeakerXMarkIcon className="h-5 w-5" />
            ) : (
              <SpeakerWaveIcon className="h-5 w-5" />
            )}
          </button>
          <div className="w-24 bg-gray-600 h-1 rounded-full">
            <div 
              className="bg-white h-1 rounded-full" 
              style={{ width: `${isMuted ? 0 : volume}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;
