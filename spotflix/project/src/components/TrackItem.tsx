import React from "react";
import { Play, Heart, MoreHorizontal } from "lucide-react";
import { Track } from "../types/music";

interface TrackItemProps {
  track: Track;
  index: number;
  onPlayTrack: (track: Track, queue: Track[]) => void;
  queue: Track[];
  isCurrentTrack?: boolean;
  isPlaying?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({
  track,
  index,
  onPlayTrack,
  queue,
  isCurrentTrack,
  isPlaying,
}) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="group flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800 transition-colors">
      <div className="w-10 flex items-center justify-center">
        {isCurrentTrack && isPlaying ? (
          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
        ) : (
          <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
        )}
        <button
          onClick={() => onPlayTrack(track, queue)}
          className="hidden group-hover:block text-white hover:text-green-500 transition-colors"
        >
          <Play size={16} />
        </button>
      </div>

      <div className="flex-1 min-w-0">
        <div
          className={`font-medium truncate ${
            isCurrentTrack ? "text-green-500" : "text-white"
          }`}
        >
          {track.title}
        </div>
        <div className="text-gray-400 text-sm truncate">{track.artist}</div>
      </div>

      <div className="text-gray-400 text-sm truncate max-w-xs">
        {track.album}
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart size={16} />
        </button>
        <span className="text-gray-400 text-sm">
          {formatDuration(track.duration)}
        </span>
        <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default TrackItem;
