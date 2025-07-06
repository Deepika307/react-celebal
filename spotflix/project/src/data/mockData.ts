import { Track, Album, Playlist, Artist } from "../types/music";

export const mockTracks: Track[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    genre: "Pop",
    year: 2020,
    isLiked: true,
  },
  {
    id: "2",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    duration: 174,
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    audioUrl: "",
    genre: "Pop",
    year: 2020,
    isLiked: false,
  },
  {
    id: "3",
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "Sour",
    duration: 178,
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    audioUrl: "",
    genre: "Pop",
    year: 2021,
    isLiked: true,
  },
  {
    id: "4",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    audioUrl: "",
    genre: "Pop",
    year: 2020,
    isLiked: false,
  },
  {
    id: "5",
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland",
    duration: 238,
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    audioUrl: "",
    genre: "Indie",
    year: 2020,
    isLiked: true,
  },
  {
    id: "6",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    duration: 200,
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    audioUrl: "",
    genre: "Pop",
    year: 2022,
    isLiked: true,
  },
];

export const mockAlbums: Album[] = [
  {
    id: "1",
    title: "After Hours",
    artist: "The Weeknd",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    year: 2020,
    genre: "Pop",
    tracks: [mockTracks[0]],
  },
  {
    id: "2",
    title: "Fine Line",
    artist: "Harry Styles",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    year: 2020,
    genre: "Pop",
    tracks: [mockTracks[1]],
  },
  {
    id: "3",
    title: "Sour",
    artist: "Olivia Rodrigo",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    year: 2021,
    genre: "Pop",
    tracks: [mockTracks[2]],
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: "1",
    name: "Today's Top Hits",
    description: "The most played songs right now",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    tracks: mockTracks.slice(0, 4),
    createdBy: "Spotify",
    isPublic: true,
    followers: 27000000,
  },
  {
    id: "2",
    name: "Chill Vibes",
    description: "Relax and unwind with these chill tracks",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    tracks: mockTracks.slice(2, 6),
    createdBy: "You",
    isPublic: false,
    followers: 12,
  },
  {
    id: "3",
    name: "Workout Mix",
    description: "High energy tracks for your workout",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    tracks: mockTracks.slice(1, 5),
    createdBy: "You",
    isPublic: true,
    followers: 45,
  },
];

export const mockArtists: Artist[] = [
  {
    id: "1",
    name: "The Weeknd",
    imageUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    followers: 85000000,
    genres: ["Pop", "R&B"],
    albums: [mockAlbums[0]],
  },
  {
    id: "2",
    name: "Harry Styles",
    imageUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    followers: 42000000,
    genres: ["Pop", "Rock"],
    albums: [mockAlbums[1]],
  },
];

export const genres = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "R&B",
  "Electronic",
  "Jazz",
  "Classical",
  "Country",
  "Indie",
  "Alternative",
];
