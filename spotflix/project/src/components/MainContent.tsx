import React from "react";
import { Track, Playlist, Album } from "../types/music";
import TrackItem from "./TrackItem";
import PlaylistView from "./PlaylistView";
interface MainContentProps {
  currentView: string;
  playlists: Playlist[];
  albums: Album[];
  tracks: Track[];
  onPlayTrack: (track: Track, queue?: Track[]) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  selectedPlaylist: Playlist | null;
  onSelectPlaylist: (playlist: Playlist | null) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  currentView,
  playlists,
  albums,
  tracks,
  onPlayTrack,
  currentTrack,
  isPlaying,
  selectedPlaylist,
  onSelectPlaylist,
}) => {
  const renderHome = () => (
    <div className="p-6 space-y-6">
      <h2 className="text-white text-2xl font-bold">Featured Playlists</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={() => onSelectPlaylist(playlist)}
          >
            <img
              src={playlist.coverUrl}
              alt={playlist.name}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="text-white text-sm font-semibold">
              {playlist.name}
            </h3>
          </div>
        ))}
      </div>

      <h2 className="text-white text-2xl font-bold">Popular Albums</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {albums.map((album) => (
          <div
            key={album.id}
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={() => onPlayTrack(album.tracks[0], album.tracks)}
          >
            <img
              src={album.coverUrl}
              alt={album.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="text-white text-sm font-semibold">{album.title}</h3>
            <p className="text-gray-400 text-xs">{album.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTracks = () => (
    <div className="p-6 space-y-4">
      <h2 className="text-white text-2xl font-bold">All Tracks</h2>
      <div className="space-y-2">
        {tracks.map((track, index) => (
          <TrackItem
            key={track.id}
            track={track}
            index={index}
            onPlayTrack={onPlayTrack}
            queue={tracks}
            isCurrentTrack={currentTrack?.id === track.id}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );

  return (
    <main className="flex-1 overflow-y-auto bg-gray-900">
      {selectedPlaylist ? (
        <PlaylistView
          playlist={selectedPlaylist}
          onPlayTrack={onPlayTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onBack={() => onSelectPlaylist(null)}
        />
      ) : currentView === "home" ? (
        renderHome()
      ) : (
        renderTracks()
      )}
    </main>
  );
};

export default MainContent;
