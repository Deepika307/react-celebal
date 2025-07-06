// src/components/PlayerBar.tsx
import React, { useContext, useRef, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

const PlayerBar: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentTrack, isPlaying, togglePlayPause, playNext, playPrevious } =
    useContext(PlayerContext)!;

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  const handleEnded = () => {
    playNext();
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between z-50">
      <div className="flex items-center space-x-4">
        <img
          src={currentTrack.cover}
          alt="cover"
          className="w-12 h-12 rounded"
        />
        <div>
          <div className="font-semibold">{currentTrack.title}</div>
          <div className="text-sm text-gray-400">{currentTrack.artist}</div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button onClick={playPrevious}>
          <SkipBack size={24} />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button onClick={playNext}>
          <SkipForward size={24} />
        </button>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.audio}
        onEnded={handleEnded}
        className="hidden"
      />
    </div>
  );
};

export default PlayerBar;
