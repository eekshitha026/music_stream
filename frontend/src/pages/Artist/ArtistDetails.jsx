import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlayIcon, UserGroupIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { HeartIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import SongCard from '../../components/SongCard';
import { getArtistById, dummySongs, getAlbumsByArtist } from '../../utils/dummyData';

const ArtistDetails = () => {
  const { artistId } = useParams();
  const artist = getArtistById(artistId);

  if (!artist) {
    return (
      <div className="min-h-screen bg-dark-gray text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Artist not found</h2>
          <Link to="/explore" className="text-spotify-green hover:underline">
            Back to explore
          </Link>
        </div>
      </div>
    );
  }

  const artistSongs = dummySongs.filter(song => song.artist === artist.name);
  const artistAlbums = getAlbumsByArtist(artist.name);
  const topSongs = artistSongs.slice(0, 5);

  const handlePlayArtist = () => {
    console.log('Playing artist:', artist.name);
  };

  const handlePlaySong = (song) => {
    console.log('Playing song:', song.title);
  };

  const handleFollow = () => {
    console.log('Following artist:', artist.name);
  };

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      {/* Artist Header */}
      <div className="relative">
        <div className="bg-gradient-to-b from-blue-600 to-blue-900 p-8 rounded-lg mb-8">
          <div className="flex items-end space-x-6">
            <img 
              src={artist.image} 
              alt={artist.name}
              className="w-48 h-48 rounded-full shadow-2xl"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <CheckBadgeIcon className="h-6 w-6 text-blue-400" />
                <p className="text-sm uppercase tracking-wide text-blue-200">Verified Artist</p>
              </div>
              <h1 className="text-6xl font-bold mb-4">{artist.name}</h1>
              <div className="flex items-center space-x-2 text-blue-200">
                <UserGroupIcon className="h-5 w-5" />
                <span className="font-semibold">{artist.followers.toLocaleString()} monthly listeners</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-6 mb-8">
        <button 
          onClick={handlePlayArtist}
          className="bg-spotify-green text-black p-4 rounded-full hover:scale-105 transition-transform"
        >
          <PlayIcon className="h-6 w-6 ml-1" />
        </button>
        <button 
          onClick={handleFollow}
          className="border border-gray-600 text-white px-6 py-2 rounded-full hover:border-white transition-colors"
        >
          Follow
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <EllipsisHorizontalIcon className="h-8 w-8" />
        </button>
      </div>

      {/* Popular Songs */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Popular</h2>
        <div className="space-y-2">
          {topSongs.map((song, index) => (
            <div 
              key={song.id}
              className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded-lg group cursor-pointer transition-colors"
              onClick={() => handlePlaySong(song)}
            >
              <span className="text-gray-400 group-hover:hidden w-4 text-center">{index + 1}</span>
              <PlayIcon className="h-4 w-4 text-white hidden group-hover:block w-4" />
              
              <img 
                src={song.cover} 
                alt={song.title}
                className="w-12 h-12 rounded"
              />
              
              <div className="flex-1">
                <p className="text-white font-medium">{song.title}</p>
                <p className="text-gray-400 text-sm">{song.plays?.toLocaleString() || 'N/A'} plays</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <HeartIcon className="h-5 w-5" />
                </button>
                <span className="text-gray-400 text-sm">{song.duration}</span>
                <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {artistSongs.length > 5 && (
          <button className="text-gray-400 hover:text-white text-sm mt-4">
            Show all
          </button>
        )}
      </section>

      {/* Albums */}
      {artistAlbums.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {artistAlbums.map((album) => (
              <Link 
                key={album.id}
                to={`/album/${album.id}`}
                className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors group"
              >
                <div className="relative mb-4">
                  <img 
                    src={album.cover} 
                    alt={album.title}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                  <button 
                    className="absolute bottom-2 right-2 bg-spotify-green text-black p-3 rounded-full hover:scale-105 transition-transform shadow-lg opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Playing album:', album.title);
                    }}
                  >
                    <PlayIcon className="h-4 w-4 ml-0.5" />
                  </button>
                </div>
                <h3 className="text-white font-semibold truncate">{album.title}</h3>
                <p className="text-gray-400 text-sm">{album.year} • Album</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Appears On */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Appears On</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Placeholder content */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="w-full aspect-square bg-gray-700 rounded-md mb-3"></div>
            <h3 className="text-white font-medium text-sm">Pop Hits 2023</h3>
            <p className="text-gray-400 text-xs">Playlist</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="w-full aspect-square bg-gray-700 rounded-md mb-3"></div>
            <h3 className="text-white font-medium text-sm">Today's Top Hits</h3>
            <p className="text-gray-400 text-xs">Playlist</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">About</h2>
        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="flex items-center space-x-4 mb-4">
            <UserGroupIcon className="h-8 w-8 text-spotify-green" />
            <div>
              <p className="text-2xl font-bold">{artist.followers.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">Monthly listeners</p>
            </div>
          </div>
          <p className="text-gray-300 mb-4">
            {artist.name} is a renowned artist known for their contributions to {artist.genres?.join(', ')} music. 
            With millions of listeners worldwide, they continue to create music that resonates with fans across the globe.
          </p>
          {artist.genres && (
            <div>
              <p className="text-gray-400 text-sm mb-2">Genres:</p>
              <div className="flex flex-wrap gap-2">
                {artist.genres.map((genre) => (
                  <span 
                    key={genre}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArtistDetails;