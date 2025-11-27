// Dummy data for the music streaming app

export const dummySongs = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    cover: "https://via.placeholder.com/300x300/1db954/ffffff?text=BL",
    genre: "Pop",
    mood: "Energetic",
    plays: 2500000
  },
  {
    id: 2,
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    duration: "3:53",
    cover: "https://via.placeholder.com/300x300/ff6b6b/ffffff?text=SY",
    genre: "Pop",
    mood: "Happy",
    plays: 2800000
  },
  {
    id: 3,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    duration: "5:55",
    cover: "https://via.placeholder.com/300x300/4ecdc4/ffffff?text=BR",
    genre: "Rock",
    mood: "Epic",
    plays: 1900000
  },
  {
    id: 4,
    title: "Someone Like You",
    artist: "Adele",
    album: "21",
    duration: "4:45",
    cover: "https://via.placeholder.com/300x300/45b7d1/ffffff?text=SL",
    genre: "Soul",
    mood: "Sad",
    plays: 2100000
  },
  {
    id: 5,
    title: "Bad Habits",
    artist: "Ed Sheeran",
    album: "=",
    duration: "3:51",
    cover: "https://via.placeholder.com/300x300/96ceb4/ffffff?text=BH",
    genre: "Pop",
    mood: "Catchy",
    plays: 1800000
  },
  {
    id: 6,
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    duration: "2:54",
    cover: "https://via.placeholder.com/300x300/ffeaa7/000000?text=WS",
    genre: "Pop",
    mood: "Summer",
    plays: 2200000
  },
  {
    id: 7,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: "3:23",
    cover: "https://via.placeholder.com/300x300/fd79a8/ffffff?text=LV",
    genre: "Pop",
    mood: "Dance",
    plays: 2600000
  },
  {
    id: 8,
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3",
    duration: "2:21",
    cover: "https://via.placeholder.com/300x300/fdcb6e/000000?text=ST",
    genre: "Pop",
    mood: "Chill",
    plays: 2400000
  }
];

export const dummyAlbums = [
  {
    id: 1,
    title: "After Hours",
    artist: "The Weeknd",
    year: 2020,
    cover: "https://via.placeholder.com/400x400/1db954/ffffff?text=AH",
    songs: [1, 2, 3], // song IDs
    genre: "Pop"
  },
  {
    id: 2,
    title: "÷ (Divide)",
    artist: "Ed Sheeran",
    year: 2017,
    cover: "https://via.placeholder.com/400x400/ff6b6b/ffffff?text=DIV",
    songs: [2, 5],
    genre: "Pop"
  },
  {
    id: 3,
    title: "A Night at the Opera",
    artist: "Queen",
    year: 1975,
    cover: "https://via.placeholder.com/400x400/4ecdc4/ffffff?text=ANO",
    songs: [3],
    genre: "Rock"
  },
  {
    id: 4,
    title: "21",
    artist: "Adele",
    year: 2011,
    cover: "https://via.placeholder.com/400x400/45b7d1/ffffff?text=21",
    songs: [4],
    genre: "Soul"
  }
];

export const dummyArtists = [
  {
    id: 1,
    name: "The Weeknd",
    image: "https://via.placeholder.com/300x300/1db954/ffffff?text=TW",
    followers: 85000000,
    verified: true,
    genres: ["Pop", "R&B"],
    albums: [1],
    topSongs: [1]
  },
  {
    id: 2,
    name: "Ed Sheeran",
    image: "https://via.placeholder.com/300x300/ff6b6b/ffffff?text=ES",
    followers: 92000000,
    verified: true,
    genres: ["Pop", "Folk"],
    albums: [2],
    topSongs: [2, 5]
  },
  {
    id: 3,
    name: "Queen",
    image: "https://via.placeholder.com/300x300/4ecdc4/ffffff?text=Q",
    followers: 45000000,
    verified: true,
    genres: ["Rock", "Progressive Rock"],
    albums: [3],
    topSongs: [3]
  },
  {
    id: 4,
    name: "Adele",
    image: "https://via.placeholder.com/300x300/45b7d1/ffffff?text=A",
    followers: 58000000,
    verified: true,
    genres: ["Soul", "Pop"],
    albums: [4],
    topSongs: [4]
  },
  {
    id: 5,
    name: "Harry Styles",
    image: "https://via.placeholder.com/300x300/ffeaa7/000000?text=HS",
    followers: 67000000,
    verified: true,
    genres: ["Pop", "Rock"],
    albums: [],
    topSongs: [6]
  },
  {
    id: 6,
    name: "Dua Lipa",
    image: "https://via.placeholder.com/300x300/fd79a8/ffffff?text=DL",
    followers: 72000000,
    verified: true,
    genres: ["Pop", "Dance"],
    albums: [],
    topSongs: [7]
  }
];

export const dummyPlaylists = [
  {
    id: 1,
    title: "My Favorites",
    description: "Songs I can't stop listening to",
    cover: "https://via.placeholder.com/300x300/1db954/ffffff?text=FAV",
    songs: [1, 2, 3, 4],
    owner: "You",
    isPublic: false,
    followers: 0
  },
  {
    id: 2,
    title: "Chill Vibes",
    description: "Perfect for relaxing",
    cover: "https://via.placeholder.com/300x300/74b9ff/ffffff?text=CV",
    songs: [4, 6, 8],
    owner: "Spotify",
    isPublic: true,
    followers: 1250000
  },
  {
    id: 3,
    title: "Pop Hits 2023",
    description: "The biggest pop songs right now",
    cover: "https://via.placeholder.com/300x300/a29bfe/ffffff?text=PH",
    songs: [1, 2, 5, 6, 7, 8],
    owner: "Spotify",
    isPublic: true,
    followers: 2800000
  },
  {
    id: 4,
    title: "Rock Classics",
    description: "Timeless rock anthems",
    cover: "https://via.placeholder.com/300x300/fd79a8/ffffff?text=RC",
    songs: [3],
    owner: "Spotify",
    isPublic: true,
    followers: 980000
  }
];

export const dummyUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/150x150/1db954/ffffff?text=JD",
    joinDate: "2022-01-15",
    status: "active",
    subscription: "Premium",
    country: "United States"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://via.placeholder.com/150x150/74b9ff/ffffff?text=JS",
    joinDate: "2021-08-22",
    status: "active",
    subscription: "Free",
    country: "Canada"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "https://via.placeholder.com/150x150/fd79a8/ffffff?text=MJ",
    joinDate: "2023-03-10",
    status: "blocked",
    subscription: "Premium",
    country: "United Kingdom"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "https://via.placeholder.com/150x150/ffeaa7/000000?text=SW",
    joinDate: "2022-11-05",
    status: "active",
    subscription: "Premium",
    country: "Australia"
  }
];

export const genres = [
  "Pop", "Rock", "Hip-Hop", "R&B", "Country", "Electronic", "Jazz", "Classical", 
  "Blues", "Reggae", "Folk", "Punk", "Metal", "Alternative", "Indie", "Soul"
];

export const moods = [
  "Happy", "Sad", "Energetic", "Chill", "Romantic", "Angry", "Peaceful", 
  "Motivational", "Nostalgic", "Party", "Workout", "Study", "Sleep", "Focus"
];

export const adminStats = {
  totalUsers: 125670,
  totalSongs: 45000000,
  totalAlbums: 3200000,
  totalArtists: 850000,
  activeUsers: 98540,
  premiumUsers: 67890,
  totalStreams: 15600000000,
  revenue: 125000000
};

export const analyticsData = {
  monthlyStreams: [
    { month: "Jan", streams: 1200000 },
    { month: "Feb", streams: 1350000 },
    { month: "Mar", streams: 1500000 },
    { month: "Apr", streams: 1650000 },
    { month: "May", streams: 1800000 },
    { month: "Jun", streams: 1950000 }
  ],
  topGenres: [
    { genre: "Pop", percentage: 35 },
    { genre: "Rock", percentage: 20 },
    { genre: "Hip-Hop", percentage: 18 },
    { genre: "Electronic", percentage: 12 },
    { genre: "R&B", percentage: 15 }
  ],
  deviceUsage: [
    { device: "Mobile", percentage: 65 },
    { device: "Desktop", percentage: 25 },
    { device: "Tablet", percentage: 10 }
  ]
};

// Helper functions
export const getSongById = (id) => dummySongs.find(song => song.id === parseInt(id));
export const getAlbumById = (id) => dummyAlbums.find(album => album.id === parseInt(id));
export const getArtistById = (id) => dummyArtists.find(artist => artist.id === parseInt(id));
export const getPlaylistById = (id) => dummyPlaylists.find(playlist => playlist.id === parseInt(id));
export const getUserById = (id) => dummyUsers.find(user => user.id === parseInt(id));

export const getSongsByIds = (ids) => ids.map(id => getSongById(id)).filter(Boolean);
export const getAlbumsByArtist = (artistName) => dummyAlbums.filter(album => album.artist === artistName);
export const getSongsByGenre = (genre) => dummySongs.filter(song => song.genre === genre);
export const getSongsByMood = (mood) => dummySongs.filter(song => song.mood === mood);

// Liked songs (simulated user data)
export const likedSongs = [1, 2, 3, 6, 7]; // Song IDs that user has liked