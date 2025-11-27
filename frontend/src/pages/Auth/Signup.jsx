import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, CheckIcon } from '@heroicons/react/24/outline';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Signup failed');
      } else {
        navigate('/login');
      }
    } catch {
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    return 'strong';
  };

  const getPasswordStrengthColor = () => {
    const strength = passwordStrength();
    if (strength === 'weak') return 'bg-red-500';
    if (strength === 'medium') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-dark-gray flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-spotify-green rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-black font-bold text-2xl">♪</span>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Join Streamify</h2>
            <p className="text-gray-400 mt-2">Create your account to start listening</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded-md text-sm">{error}</div>
        )}

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:border-transparent"
                placeholder="John"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:border-transparent"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:border-transparent"
              placeholder="john@example.com"
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
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:border-transparent"
                placeholder="Create a strong password"
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
            {formData.password && (
              <div className="mt-1">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Password strength:</span>
                  <span className="capitalize">{passwordStrength()}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all ${getPasswordStrengthColor()}`}
                    style={{ 
                      width: passwordStrength() === 'weak' ? '33%' : 
                             passwordStrength() === 'medium' ? '66%' : '100%' 
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:border-transparent"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
            )}
          </div>

          <div className="flex items-center">
            <div className="relative">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="sr-only"
              />
              <div 
                className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer ${
                  formData.agreeToTerms ? 'bg-spotify-green border-spotify-green' : 'border-gray-600 bg-gray-800'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, agreeToTerms: !prev.agreeToTerms }))}
              >
                {formData.agreeToTerms && (
                  <CheckIcon className="h-3 w-3 text-black" />
                )}
              </div>
            </div>
            <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-300">
              I agree to the{' '}
              <Link to="/terms" className="text-spotify-green hover:text-green-400">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-spotify-green hover:text-green-400">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.agreeToTerms}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              isLoading || !formData.agreeToTerms
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-spotify-green text-black hover:bg-green-400'
            }`}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* Admin Login Link */}
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Admin?{' '}
            <Link to="/admin/login" className="text-red-500 hover:text-red-400 font-medium">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-spotify-green hover:text-green-400 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
