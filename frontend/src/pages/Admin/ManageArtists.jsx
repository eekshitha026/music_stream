import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { dummyArtists } from '../../utils/dummyData';

const ManageArtists = () => {
  const [artists, setArtists] = useState(dummyArtists);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDeleteArtist = (artistId) => {
    if (window.confirm('Are you sure you want to delete this artist?')) {
      setArtists(artists.filter(artist => artist.id !== artistId));
    }
  };

  const toggleVerification = (artistId) => {
    setArtists(artists.map(artist => 
      artist.id === artistId ? { ...artist, verified: !artist.verified } : artist
    ));
  };

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Artists</h1>
          <p className="text-gray-400">Add and manage music artists</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-spotify-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Artist</span>
        </button>
      </div>

      {/* Artists Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <div key={artist.id} className="bg-gray-900 p-6 rounded-lg text-center">
            <div className="relative mb-4">
              <img 
                src={artist.image} 
                alt={artist.name}
                className="w-24 h-24 rounded-full mx-auto mb-3"
              />
              {artist.verified && (
                <CheckBadgeIcon className="absolute top-16 right-1/2 transform translate-x-8 h-6 w-6 text-blue-500" />
              )}
            </div>
            
            <h3 className="text-white font-semibold mb-1">{artist.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{artist.followers?.toLocaleString()} followers</p>
            <p className="text-gray-500 text-xs mb-4">{artist.genres?.join(', ')}</p>
            
            <div className="space-y-2">
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors">
                  <PencilIcon className="h-4 w-4 inline mr-1" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteArtist(artist.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm transition-colors"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
              <button 
                onClick={() => toggleVerification(artist.id)}
                className={`w-full py-2 px-3 rounded text-sm transition-colors ${
                  artist.verified 
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {artist.verified ? 'Remove Verification' : 'Verify Artist'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Artist Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Add New Artist</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Artist name"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
              />
              <input
                type="text"
                placeholder="Genres (comma separated)"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
              />
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="verified" className="rounded" />
                <label htmlFor="verified" className="text-gray-300">Verified Artist</label>
              </div>
              <div className="flex space-x-3">
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
                  Add Artist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageArtists;