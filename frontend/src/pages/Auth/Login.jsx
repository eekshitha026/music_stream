import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const id = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    if (id) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
      } else {
        try {
          localStorage.setItem('userId', String(data.id));
          localStorage.setItem('userEmail', String(data.email || ''));
          localStorage.setItem('userFirstName', String(data.firstName || ''));
          localStorage.setItem('userLastName', String(data.lastName || ''));
        } catch {}
        navigate('/dashboard');
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
          <div className="w-16 h-16 bg-spotify-green rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-black font-bold text-2xl">♪</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome to Streamify</h2>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded-md text-sm">{error}</div>
        )}

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:border-transparent"
              placeholder="Enter your email"
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
                className="w-full px-3 py-2 pr-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:border-transparent"
                placeholder="Enter your password"
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
                className="h-4 w-4 bg-gray-800 border-gray-600 rounded focus:ring-spotify-green text-spotify-green"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <Link 
              to="/forgot-password" 
              className="text-sm text-spotify-green hover:text-green-400"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              isLoading
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-spotify-green text-black hover:bg-green-400'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-spotify-green hover:text-green-400 font-medium">
              Sign up here
            </Link>
          </p>
          <p className="text-gray-400">
            Admin?{' '}
            <Link to="/admin/login" className="text-red-500 hover:text-red-400 font-medium">
              Go to Admin Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
