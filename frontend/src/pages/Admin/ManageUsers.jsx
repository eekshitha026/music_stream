import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, EyeIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setError('');
      setLoading(true);
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Failed to load users');
        } else {
          setUsers(Array.isArray(data) ? data : []);
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const filteredUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(user => filterStatus === 'all' || user.status === filterStatus);

  const handleToggleBlock = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, status: user.status === 'active' ? 'blocked' : 'active' };
      }
      return user;
    }));
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: 'bg-green-600 text-white',
      blocked: 'bg-red-600 text-white'
    };
    return statusColors[status] || 'bg-gray-600 text-white';
  };

  const getSubscriptionBadge = (subscription) => {
    return subscription === 'Premium' ? 'bg-yellow-600 text-black' : 'bg-gray-600 text-white';
  };

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manage Users</h1>
        <p className="text-gray-400">View and manage user accounts</p>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 p-6 rounded-lg mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-spotify-green"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>

          <div className="text-gray-400 flex items-center">
            Total: {filteredUsers.length} users
          </div>
        </div>
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-md text-sm mt-4">{error}</div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-300">Avatar</th>
                <th className="text-left p-4 text-gray-300">Name</th>
                <th className="text-left p-4 text-gray-300">Email</th>
                <th className="text-left p-4 text-gray-300">Join Date</th>
                <th className="text-left p-4 text-gray-300">Subscription</th>
                <th className="text-left p-4 text-gray-300">Status</th>
                <th className="text-left p-4 text-gray-300">Country</th>
                <th className="text-left p-4 text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="p-4 text-gray-400" colSpan="8">Loading users...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td className="p-4 text-gray-400" colSpan="8">No users found</td>
                </tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-gray-800 hover:bg-gray-800">
                  <td className="p-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">
                        {(user.firstName?.[0] || '').toUpperCase()}{(user.lastName?.[0] || '').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-white font-medium">{user.firstName} {user.lastName}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-300">{user.email}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-300">{user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium bg-gray-700 text-white`}>
                      Standard
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium bg-green-600 text-white`}>
                      active
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-300">-</p>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-400 hover:text-blue-300 p-1"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleToggleBlock(user.id)}
                        className={`p-1 ${
                          'text-red-400 hover:text-red-300' 
                        }`}
                        title={user.status === 'active' ? 'Block User' : 'Unblock User'}
                      >
                        <ShieldExclamationIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <div className="bg-gray-900 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {users.filter(u => u.status === 'active').length}
          </div>
          <div className="text-gray-400 text-sm">Active Users</div>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-400 mb-1">
            {users.filter(u => u.status === 'blocked').length}
          </div>
          <div className="text-gray-400 text-sm">Blocked Users</div>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {users.filter(u => u.subscription === 'Premium').length}
          </div>
          <div className="text-gray-400 text-sm">Premium Users</div>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {users.filter(u => u.subscription === 'Free').length}
          </div>
          <div className="text-gray-400 text-sm">Free Users</div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
