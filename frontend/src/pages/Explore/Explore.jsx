import React, { useEffect, useRef, useState } from 'react';
import SongCard from '../../components/SongCard';
import PlaylistCard from '../../components/PlaylistCard';
import ArtistCard from '../../components/ArtistCard';
import { dummyPlaylists, dummyArtists, genres } from '../../utils/dummyData';

const Explore = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');
  const audioRef = useRef(null);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'songs', label: 'Songs' },
    { id: 'albums', label: 'Albums' },
    { id: 'artists', label: 'Artists' },
    { id: 'playlists', label: 'Playlists' }
  ];

  const handlePlaySong = (song) => {
    const audio = audioRef.current;
    if (!audio || !song.filePath) return;
    const url = song.filePath.startsWith('/media') ? `http://localhost:8080${song.filePath}` : song.filePath;
    audio.src = url;
    audio.play().catch(() => {});
  };

  const handlePlayPlaylist = (playlist) => {
    console.log('Playing playlist:', playlist.title);
  };

  const handlePlayArtist = (artist) => {
    console.log('Playing artist:', artist.name);
  };

  useEffect(() => {
    const loadSongs = async () => {
      setError('');
      try {
        const params = new URLSearchParams();
        if (selectedGenre) params.append('genre', selectedGenre);
        if (selectedType) params.append('type', selectedType);
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
    if (activeTab === 'songs') loadSongs();
  }, [activeTab, selectedGenre, selectedType]);

  const renderGenreGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => setSelectedGenre(selectedGenre === genre ? '' : genre)}
          className={`p-6 rounded-lg text-left transition-all ${
            selectedGenre === genre
              ? 'bg-spotify-green text-black'
              : 'bg-gradient-to-br from-purple-600 to-blue-600 text-white hover:scale-105'
          }`}
        >
          <h3 className="font-bold text-lg mb-1">{genre}</h3>
          <p className="text-sm opacity-80">
            {Math.floor(Math.random() * 1000) + 100} songs
          </p>
        </button>
      ))}
    </div>
  );

  const renderTypeGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {['Movie', 'Album', 'Single'].map((t) => (
        <button
          key={t}
          onClick={() => setSelectedType(selectedType === t ? '' : t)}
          className={`p-6 rounded-lg text-left transition-all ${
            selectedType === t
              ? 'bg-spotify-green text.black'
              : 'bg-gradient-to-br from-pink-600 to-orange-600 text-white hover:scale-105'
          }`}
        >
          <h3 className="font-bold text-lg mb-1">{t}</h3>
          <p className="text-sm opacity-80">Filter by type</p>
        </button>
      ))}
    </div>
  );

  const renderContent = () => {
    const filteredSongs = songs;

    switch (activeTab) {
      case 'songs':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} onPlay={handlePlaySong} />
            ))}
          </div>
        );
      
      case 'albums':
        return (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-400 mb-4">Albums coming soon!</h3>
            <p className="text-gray-500">We're working on adding album browsing</p>
          </div>
        );
      
      case 'artists':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {dummyArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} onPlay={handlePlayArtist} />
            ))}
          </div>
        );
      
      case 'playlists':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dummyPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} onPlay={handlePlayPlaylist} />
            ))}
          </div>
        );
      
      default: // 'all'
        return (
          <div className="space-y-12">
            {/* Browse by Genre */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Browse by Genre</h2>
              {renderGenreGrid()}
            </section>

            {/* Browse by Type */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Browse by Type</h2>
              {renderTypeGrid()}
            </section>

            {/* Popular Artists */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Popular Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {dummyArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} onPlay={handlePlayArtist} />
                ))}
              </div>
            </section>

            {/* Featured Playlists */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dummyPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} onPlay={handlePlayPlaylist} />
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Explore Music</h1>
        <p className="text-gray-400">Discover new songs, artists, and playlists</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-900 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedGenre('');
              setSelectedType('');
            }}
            className={`px-4 py-2 rounded-md font.medium transition-colors ${
              activeTab === tab.id
                ? 'bg-spotify-green text-black'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters - Show only for songs tab */}
      {activeTab === 'songs' && (
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-spotify-green"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-spotify-green"
          >
            <option value="">All Types</option>
            <option value="Movie">Movie</option>
            <option value="Album">Album</option>
            <option value="Single">Single</option>
          </select>

          {(selectedGenre || selectedType) && (
            <button
              onClick={() => {
                setSelectedGenre('');
                setSelectedType('');
              }}
              className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div className="pb-24">
        {renderContent()}
        <audio ref={audioRef} hidden />
      </div>
    </div>
  );
};

export default Explore;
