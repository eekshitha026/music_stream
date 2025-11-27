import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { dummyAlbums } from '../../utils/dummyData';

const ManageAlbums = () => {
  const [albums, setAlbums] = useState(dummyAlbums);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDeleteAlbum = (albumId) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      setAlbums(albums.filter(album => album.id !== albumId));
    }
  };

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Albums</h1>
          <p className="text-gray-400">Create and manage music albums</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-spotify-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Album</span>
        </button>
      </div>

      {/* Albums Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {albums.map((album) => (
          <div key={album.id} className="bg-gray-900 p-4 rounded-lg">
            <div className="relative mb-4">
              <img 
                src={album.cover} 
                alt={album.title}
                className="w-full aspect-square object-cover rounded-lg"
              />
            </div>
            
            <h3 className="text-white font-semibold mb-1">{album.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{album.artist}</p>
            <p className="text-gray-500 text-xs mb-4">{album.year} • {album.songs?.length || 0} songs</p>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors">
                <PencilIcon className="h-4 w-4 inline mr-1" />
                Edit
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition-colors">
                <EyeIcon className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleDeleteAlbum(album.id)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm transition-colors"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Album Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Add New Album</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Album title"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
              />
              <input
                type="text"
                placeholder="Artist name"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
              />
              <input
                type="number"
                placeholder="Release year"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
              />
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
                  Add Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAlbums;