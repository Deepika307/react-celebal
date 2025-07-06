import React from 'react';
import { Play } from 'lucide-react';
import { Album } from '../types/music';

interface AlbumCardProps {
  album: Album;
  onPlay: () => void;
  onClick: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onPlay, onClick }) => {
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
          src={album.coverUrl}
          alt={album.title}
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
        <h3 className="text-white font-bold truncate">{album.title}</h3>
        <p className="text-gray-400 text-sm">{album.artist}</p>
        <div className="text-gray-400 text-xs">
          {album.year} • {album.tracks.length} songs
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;