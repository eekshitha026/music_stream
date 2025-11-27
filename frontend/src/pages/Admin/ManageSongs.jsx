import React, { useState } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  CloudArrowUpIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
// Using backend data; removing dummySongs

const ManageSongs = () => {
  const [songs, setSongs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [form, setForm] = useState({ title: '', movieName: '', genre: '', type: '' });
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const genres = ['All', 'Pop', 'Rock', 'Hip-Hop', 'R&B', 'Electronic', 'Jazz'];

  const filteredSongs = songs
    .filter(song => 
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (song.movieName || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(song => selectedGenre === '' || selectedGenre === 'All' || song.genre === selectedGenre)
    .sort((a, b) => {
      switch (sortBy) {
        case 'title': return a.title.localeCompare(b.title);
        case 'genre': return (a.genre || '').localeCompare(b.genre || '');
        default: return 0;
      }
    });

  React.useEffect(() => {
    const loadSongs = async () => {
      setError('');
      setLoading(true);
      try {
        const res = await fetch('/api/songs');
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Failed to load songs');
        } else {
          setSongs(Array.isArray(data) ? data : []);
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    loadSongs();
  }, []);

  const handleDeleteSong = (songId) => {
    if (!window.confirm('Are you sure you want to delete this song?')) return;
    (async () => {
      try {
        const res = await fetch(`/api/admin/songs/${songId}`, { method: 'DELETE' });
        if (res.ok) {
          setSongs(songs.filter(song => song.id !== songId));
        }
      } catch {}
    })();
  };

  const handleEditSong = (songId) => {
    console.log('Edit song:', songId);
  };

  const handleAddSong = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title || !audioFile) {
      setError('Title and audio file are required');
      return;
    }
    try {
      let coverBase64 = '';
      if (coverFile) {
        coverBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
          reader.onerror = reject;
          reader.readAsDataURL(coverFile);
        });
      }
      const fd = new FormData();
      fd.append('title', form.title);
      if (form.movieName) fd.append('movieName', form.movieName);
      if (form.genre) fd.append('genre', form.genre);
      if (form.type) fd.append('type', form.type);
      if (coverBase64) fd.append('coverImageBase64', coverBase64);
      fd.append('file', audioFile);
      const res = await fetch('/api/admin/songs', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to upload');
      } else {
        setShowAddModal(false);
        setForm({ title: '', movieName: '', genre: '', type: '' });
        setAudioFile(null);
        setCoverFile(null);
        setSongs([data, ...songs]);
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Songs</h1>
          <p className="text-gray-400">Add, edit, and manage your music library</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-spotify-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Song</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 p-6 rounded-lg mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search songs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
            />
          </div>

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-spotify-green"
          >
            {genres.map(genre => (
              <option key={genre} value={genre === 'All' ? '' : genre}>{genre}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-spotify-green"
          >
            <option value="title">Sort by Title</option>
            <option value="artist">Sort by Artist</option>
            <option value="plays">Sort by Plays</option>
          </select>

          <div className="text-gray-400 flex items-center">
            Total: {filteredSongs.length} songs
          </div>
        </div>
      </div>

      {/* Songs Table */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-300">Cover</th>
                <th className="text-left p-4 text-gray-300">Title</th>
                <th className="text-left p-4 text-gray-300">Movie</th>
                <th className="text-left p-4 text-gray-300">Genre</th>
                <th className="text-left p-4 text-gray-300">Type</th>
                <th className="text-left p-4 text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="p-4 text-gray-400" colSpan="6">Loading songs...</td>
                </tr>
              ) : filteredSongs.map((song) => (
                <tr key={song.id} className="border-t border-gray-800 hover:bg-gray-800">
                  <td className="p-4">
                    <img 
                      src={song.cover || (song.coverImageBase64 ? `data:image/*;base64,${song.coverImageBase64}` : 'https://via.placeholder.com/100x100/1db954/ffffff?text=SONG')} 
                      alt={song.title}
                      className="w-12 h-12 rounded"
                    />
                  </td>
                  <td className="p-4">
                    <p className="text-white font-medium">{song.title}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-300">{song.movieName || '-'}</p>
                  </td>
                  <td className="p-4">
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">{song.genre || '-'}</span>
                  </td>
                  <td className="p-4">
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">{song.type || '-'}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditSong(song.id)}
                        className="text-blue-400 hover:text-blue-300 p-1"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-green-400 hover:text-green-300 p-1"
                        title="View"
                        onClick={() => window.open(song.filePath, '_blank')}
                      onClick={() => {
                        const url = song.filePath?.startsWith('/media') ? `http://localhost:8080${song.filePath}` : song.filePath;
                        if (url) window.open(url, '_blank');
                      }}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteSong(song.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Song Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Add New Song</h3>
            <form className="space-y-4" onSubmit={handleAddSong}>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Song Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                  placeholder="Enter song title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Movie Name</label>
                <input
                  type="text"
                  value={form.movieName}
                  onChange={(e) => setForm({ ...form, movieName: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                  placeholder="Enter movie name (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                <input
                  type="text"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                  placeholder="Enter type (e.g., Movie, Album, Single)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Genre
                  </label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green" value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })}>
                    <option>Pop</option>
                    <option>Rock</option>
                    <option>Hip-Hop</option>
                    <option>R&B</option>
                    <option>Electronic</option>
                    <option>Jazz</option>
                  </select>
                </div>
                
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Audio File
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm mb-2">Drop your audio file here or click to browse</p>
                  <input type="file" accept="audio/*" className="hidden" id="audioFileInput" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
                  <label htmlFor="audioFileInput" className="inline-block bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">Choose File</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cover Image
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm mb-2">Drop cover image here or click to browse</p>
                  <input type="file" accept="image/*" className="hidden" id="coverFileInput" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} />
                  <label htmlFor="coverFileInput" className="inline-block bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">Choose Image</label>
                </div>
              </div>

              {error && (
                <div className="bg-red-600 text-white p-3 rounded-md text-sm">{error}</div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-spotify-green text-black py-2 px-4 rounded-lg hover:bg-green-400 transition-colors font-semibold"
                >
                  Add Song
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSongs;
