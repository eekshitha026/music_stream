import React from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, MusicalNoteIcon, DevicePhoneMobileIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/solid';

const LandingHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-20 h-20 bg-spotify-green rounded-full flex items-center justify-center mx-auto mb-6">
              <MusicalNoteIcon className="h-10 w-10 text-black" />
            </div>
            <h1 className="text-6xl font-bold text-white mb-6">
              Music for everyone.
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Millions of songs. No credit card needed. Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/signup" 
                className="bg-spotify-green text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors min-w-48"
              >
                Get Started Free
              </Link>
              <Link 
                to="/login" 
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-colors min-w-48"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Why choose MusicStream?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-spotify-green rounded-full flex items-center justify-center mx-auto mb-4">
                <MusicalNoteIcon className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Millions of Songs</h3>
              <p className="text-gray-400">Access to a vast library of music from all genres and artists worldwide.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-spotify-green rounded-full flex items-center justify-center mx-auto mb-4">
                <DevicePhoneMobileIcon className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Any Device</h3>
              <p className="text-gray-400">Listen on your phone, tablet, computer, and more with seamless synchronization.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-spotify-green rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Personalized</h3>
              <p className="text-gray-400">Get recommendations tailored to your taste and discover new favorites.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <SparklesIcon className="h-16 w-16 text-spotify-green mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">Ready to start listening?</h2>
          <p className="text-xl text-gray-300 mb-8">Join millions of users and discover your next favorite song today.</p>
          <Link 
            to="/signup" 
            className="bg-spotify-green text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors inline-flex items-center space-x-2"
          >
            <PlayIcon className="h-6 w-6" />
            <span>Start Listening Now</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">MusicStream</h3>
              <p className="text-gray-400 text-sm">Your ultimate music streaming destination.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/signup" className="hover:text-white">Free Plan</Link></li>
                <li><Link to="/signup" className="hover:text-white">Premium</Link></li>
                <li><Link to="/signup" className="hover:text-white">Mobile App</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="#" className="hover:text-white">About</Link></li>
                <li><Link to="#" className="hover:text-white">Careers</Link></li>
                <li><Link to="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="#" className="hover:text-white">Help Center</Link></li>
                <li><Link to="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 MusicStream. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingHome;