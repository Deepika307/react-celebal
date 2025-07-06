import React from "react";
import { Playlist, Track } from "../types/music";
import { ArrowLeft, Play } from "lucide-react";

interface PlaylistViewProps {
  playlist: Playlist;
  onBack: () => void;
  onPlayTrack: (track: Track, queue?: Track[]) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
}

const PlaylistView: React.FC<PlaylistViewProps> = ({
  playlist,
  onBack,
  onPlayTrack,
  currentTrack,
  isPlaying,
}) => {
  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="flex items-center text-white hover:text-green-400 mb-4"
      >
        <ArrowLeft className="mr-2" /> Back to Playlists
      </button>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-40 h-40 rounded-lg object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold text-white">{playlist.name}</h2>
          <p className="text-gray-400">{playlist.description}</p>
          <p className="text-gray-400 text-sm">
            {playlist.tracks.length} songs
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {playlist.tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => onPlayTrack(track, playlist.tracks)}
            className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors ${
              currentTrack?.id === track.id ? "bg-gray-800" : "bg-gray-900"
            }`}
          >
            <div>
              <p className="text-white font-medium">{track.title}</p>
              <p className="text-sm text-gray-400">{track.artist}</p>
            </div>
            <button>
              <Play size={20} className="text-green-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistView;
