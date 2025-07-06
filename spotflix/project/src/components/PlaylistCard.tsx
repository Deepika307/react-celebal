import React from 'react';
import { Play } from 'lucide-react';
import { Playlist } from '../types/music';

interface PlaylistCardProps {
  playlist: Playlist;
  onPlay: () => void;
  onClick: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onPlay, onClick }) => {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay();
  };

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group"
    >
      <div className="relative mb-4">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <button
          onClick={handlePlayClick}
          className="absolute bottom-2 right-2 bg-green-500 text-black rounded-full p-3 opacity-0 group-hover:opacity-100 hover:scale-105 transition-all shadow-lg"
        >
          <Play size={20} />
        </button>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-white font-bold truncate">{playlist.name}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{playlist.description}</p>
        <div className="text-gray-400 text-xs">
          {playlist.tracks.length} songs
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;