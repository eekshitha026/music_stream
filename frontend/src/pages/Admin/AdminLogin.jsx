import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
      } else {
        navigate('/admin/dashboard');
      }
    } catch {
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-gray flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheckIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Admin Portal</h2>
          <p className="text-gray-400 mt-2">Sign in to manage Streamify</p>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded-md text-sm">{error}</div>
        )}

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Admin Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="admin@streamify.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter admin password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 bg-gray-800 border-gray-600 rounded focus:ring-red-500 text-red-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Keep me signed in
              </label>
            </div>

            <a href="#" className="text-sm text-red-400 hover:text-red-300">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              isLoading
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign in to Admin'}
          </button>
        </form>

        {/* Security Notice */}
        <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-5 w-5 text-yellow-400 mr-2" />
            <p className="text-yellow-200 text-sm">
              This is a secure admin area. All actions are logged and monitored.
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">Demo Credentials:</h4>
          <div className="text-gray-300 text-sm space-y-1">
            <p><span className="text-gray-400">Email:</span> admin@streamify.com</p>
            <p><span className="text-gray-400">Password:</span> Admin@123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
