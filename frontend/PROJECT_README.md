# Music Streaming App Frontend

A complete music streaming application frontend built with React, Vite, and Tailwind CSS.

## 🎵 Features

### User Side
- **Home**: Featured playlists, recently played, and trending music
- **Authentication**: Login and Signup pages
- **Explore**: Discover new music by genres and categories  
- **Playlists**: Manage and view personal playlists
- **Liked Songs**: Collection of liked/favorite songs
- **Album Details**: View album tracks and information
- **Artist Details**: Explore artist profiles and discography
- **Profile**: User profile and settings management
- **Global Player**: Bottom music player accessible from all pages

### Admin Side
- **Admin Dashboard**: Overview of platform statistics
- **Manage Songs**: Add, edit, and delete songs
- **Manage Albums**: Album management with CRUD operations
- **Manage Artists**: Artist profile management
- **Manage Users**: User account management and analytics
- **Analytics**: Comprehensive platform analytics and insights

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🛠 Tech Stack

- **React 19.2.0** - UI Framework
- **Vite** - Build Tool & Development Server
- **Tailwind CSS** - Utility-First CSS Framework
- **React Router DOM** - Client-Side Routing
- **Heroicons** - Beautiful SVG Icons

## 📁 Project Structure

```
src/
├── components/          # Shared UI components
│   ├── Navbar.jsx      # Navigation header
│   ├── Sidebar.jsx     # Side navigation
│   ├── BottomPlayer.jsx # Global music player
│   ├── SongCard.jsx    # Song display component
│   ├── PlaylistCard.jsx # Playlist display component
│   └── ArtistCard.jsx  # Artist display component
├── pages/              # Page components
│   ├── Home.jsx        # Homepage
│   ├── Auth/           # Authentication pages
│   ├── Explore.jsx     # Music discovery
│   ├── Playlist/       # Playlist management
│   ├── Liked.jsx       # Liked songs
│   ├── Album/          # Album details
│   ├── Artist/         # Artist details
│   ├── Profile.jsx     # User profile
│   └── Admin/          # Admin panel pages
├── utils/              # Utility functions
│   └── dummyData.js    # Mock data for development
├── App.jsx             # Main app component
├── AppRoutes.jsx       # Routing configuration
└── main.jsx            # Application entry point
```

## 🎨 Design System

- **Dark Theme**: Spotify-inspired dark color scheme
- **Spotify Green**: Primary accent color (#1db954)
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Consistent UI**: Unified component design across all pages

## 📱 Routes

### User Routes
- `/` - Home
- `/login` - Login
- `/signup` - Signup
- `/explore` - Explore Music
- `/playlists` - Playlists
- `/liked` - Liked Songs
- `/album/:id` - Album Details
- `/artist/:id` - Artist Details
- `/profile` - User Profile

### Admin Routes
- `/admin` - Admin Login
- `/admin/dashboard` - Admin Dashboard
- `/admin/songs` - Manage Songs
- `/admin/albums` - Manage Albums
- `/admin/artists` - Manage Artists
- `/admin/users` - Manage Users
- `/admin/analytics` - Analytics

## 🎯 Key Features

- **Responsive Layout**: Adapts to all screen sizes
- **Dark Mode**: Elegant dark theme throughout
- **Interactive UI**: Hover effects and smooth transitions
- **Mock Data**: Complete dummy data for all features
- **Component Architecture**: Reusable and maintainable components
- **Admin Panel**: Full featured administration interface

## 🔧 Development

This is a frontend-only application using mock data. All functionality is simulated with dummy data and state management. No backend or API integration is required.

## 📄 License

This project is for educational and demonstration purposes.