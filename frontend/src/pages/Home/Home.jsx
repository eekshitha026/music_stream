import React from 'react';
import { Link } from 'react-router-dom';
import SongCard from '../../components/SongCard';
import PlaylistCard from '../../components/PlaylistCard';
import ArtistCard from '../../components/ArtistCard';
import { dummySongs, dummyPlaylists, dummyArtists } from '../../utils/dummyData';

const Home = () => {
  const trendingSongs = dummySongs.slice(0, 6);
  const featuredPlaylists = dummyPlaylists.slice(0, 4);
  const recommendedArtists = dummyArtists.slice(0, 6);
  const recentlyPlayed = dummySongs.slice(2, 8);

  const handlePlaySong = (song) => {
    console.log('Playing song:', song.title);
  };

  const handlePlayPlaylist = (playlist) => {
    console.log('Playing playlist:', playlist.title);
  };

  const handlePlayArtist = (artist) => {
    console.log('Playing artist:', artist.name);
  };

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
        <p className="text-xl text-gray-300 mb-6">Discover new music and enjoy your favorites</p>
        <Link 
          to="/explore" 
          className="bg-spotify-green text-black px-6 py-3 rounded-full font-semibold hover:bg-green-400 transition-colors inline-block"
        >
          Explore Music
        </Link>
      </div>

      {/* Trending Songs */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <Link to="/explore" className="text-gray-400 hover:text-white text-sm">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingSongs.map((song) => (
            <SongCard 
              key={song.id} 
              song={song} 
              onPlay={handlePlaySong}
            />
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Playlists</h2>
          <Link to="/playlists" className="text-gray-400 hover:text-white text-sm">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredPlaylists.map((playlist) => (
            <PlaylistCard 
              key={playlist.id} 
              playlist={playlist} 
              onPlay={handlePlayPlaylist}
            />
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Artists</h2>
          <Link to="/explore" className="text-gray-400 hover:text-white text-sm">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recommendedArtists.map((artist) => (
            <ArtistCard 
              key={artist.id} 
              artist={artist} 
              onPlay={handlePlayArtist}
            />
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recently Played</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recentlyPlayed.map((song) => (
            <SongCard 
              key={song.id} 
              song={song} 
              onPlay={handlePlaySong}
            />
          ))}
        </div>
      </section>

      {/* Quick Access */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            to="/liked" 
            className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-lg hover:scale-105 transition-transform"
          >
            <h3 className="text-lg font-semibold">Liked Songs</h3>
            <p className="text-sm text-gray-200">Your favorite tracks</p>
          </Link>
          <Link 
            to="/playlists" 
            className="bg-gradient-to-br from-blue-500 to-teal-500 p-6 rounded-lg hover:scale-105 transition-transform"
          >
            <h3 className="text-lg font-semibold">Your Playlists</h3>
            <p className="text-sm text-gray-200">Personal collections</p>
          </Link>
          <Link 
            to="/explore" 
            className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-lg hover:scale-105 transition-transform"
          >
            <h3 className="text-lg font-semibold">Explore</h3>
            <p className="text-sm text-gray-200">Discover new music</p>
          </Link>
          <Link 
            to="/profile" 
            className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-lg hover:scale-105 transition-transform"
          >
            <h3 className="text-lg font-semibold">Profile</h3>
            <p className="text-sm text-gray-200">Your account</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;