import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlayIcon, HeartIcon, EllipsisHorizontalIcon, ClockIcon } from '@heroicons/react/24/outline';
import { getAlbumById, getSongsByIds } from '../../utils/dummyData';

const AlbumDetails = () => {
  const { albumId } = useParams();
  const album = getAlbumById(albumId);

  if (!album) {
    return (
      <div className="min-h-screen bg-dark-gray text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Album not found</h2>
          <Link to="/explore" className="text-spotify-green hover:underline">
            Back to explore
          </Link>
        </div>
      </div>
    );
  }

  const songs = getSongsByIds(album.songs);

  const handlePlayAlbum = () => {
    console.log('Playing album:', album.title);
  };

  const handlePlaySong = (song) => {
    console.log('Playing song:', song.title);
  };

  const totalDuration = songs.reduce((acc, song) => {
    const [minutes, seconds] = song.duration.split(':').map(Number);
    return acc + minutes * 60 + seconds;
  }, 0);

  const formatTotalDuration = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      {/* Album Header */}
      <div className="bg-gradient-to-b from-gray-700 to-gray-900 p-8 rounded-lg mb-8">
        <div className="flex items-end space-x-6">
          <img 
            src={album.cover} 
            alt={album.title}
            className="w-48 h-48 rounded-lg shadow-2xl"
          />
          <div className="flex-1">
            <p className="text-sm uppercase tracking-wide text-gray-300 mb-2">Album</p>
            <h1 className="text-5xl font-bold mb-4">{album.title}</h1>
            <div className="flex items-center space-x-2 text-gray-300">
              <Link 
                to={`/artist/${album.artist.replace(/\\s+/g, '-').toLowerCase()}`}
                className="font-semibold hover:underline"
              >
                {album.artist}
              </Link>
              <span>•</span>
              <span>{album.year}</span>
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
          onClick={handlePlayAlbum}
          className="bg-spotify-green text-black p-4 rounded-full hover:scale-105 transition-transform"
        >
          <PlayIcon className="h-6 w-6 ml-1" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <HeartIcon className="h-8 w-8" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <EllipsisHorizontalIcon className="h-8 w-8" />
        </button>
      </div>

      {/* Songs List */}
      <div className="space-y-2">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-gray-400 text-sm border-b border-gray-800">
          <div className="col-span-1">#</div>
          <div className="col-span-8">TITLE</div>
          <div className="col-span-2">PLAYS</div>
          <div className="col-span-1 text-right">
            <ClockIcon className="h-4 w-4 ml-auto" />
          </div>
        </div>

        {/* Songs */}
        {songs.map((song, index) => (
          <div 
            key={song.id}
            className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-800 rounded-lg group cursor-pointer transition-colors"
            onClick={() => handlePlaySong(song)}
          >
            <div className="col-span-1 flex items-center">
              <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
              <PlayIcon className="h-4 w-4 text-white hidden group-hover:block" />
            </div>
            
            <div className="col-span-8 flex items-center">
              <div>
                <p className="text-white font-medium">{song.title}</p>
                <p className="text-gray-400 text-sm">{song.artist}</p>
              </div>
            </div>
            
            <div className="col-span-2 flex items-center">
              <p className="text-gray-400 text-sm">{song.plays?.toLocaleString() || 'N/A'}</p>
            </div>
            
            <div className="col-span-1 flex items-center justify-end space-x-2">
              <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <HeartIcon className="h-4 w-4" />
              </button>
              <span className="text-gray-400 text-sm">{song.duration}</span>
              <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <EllipsisHorizontalIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* More by Artist */}
      <div className="mt-16 pt-8 border-t border-gray-800">
        <h2 className="text-2xl font-bold mb-6">More by {album.artist}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Placeholder for more albums */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="w-full aspect-square bg-gray-700 rounded-md mb-3"></div>
            <h3 className="text-white font-medium text-sm">Another Album</h3>
            <p className="text-gray-400 text-xs">2023</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="w-full aspect-square bg-gray-700 rounded-md mb-3"></div>
            <h3 className="text-white font-medium text-sm">Greatest Hits</h3>
            <p className="text-gray-400 text-xs">2022</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;