import React, { useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
} from "lucide-react";
import { PlayerState } from "../types/music";

interface PlayerProps {
  playerState: PlayerState;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPreviousTrack: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
}

const Player: React.FC<PlayerProps> = ({
  playerState,
  onTogglePlay,
  onNextTrack,
  onPreviousTrack,
  onToggleShuffle,
  onToggleRepeat,
  onVolumeChange,
  onSeek,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && playerState.currentTrack) {
      audioRef.current.src = playerState.currentTrack.audioUrl;
      if (playerState.isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playerState.currentTrack, playerState.isPlaying]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    onVolumeChange(volume);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      onSeek(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    onNextTrack();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 px-6 py-4 flex items-center justify-between text-white border-t border-gray-800">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <div className="flex items-center space-x-4">
        <img
          src={playerState.currentTrack?.coverUrl}
          alt="cover"
          className="w-12 h-12 rounded"
        />
        <div>
          <div className="text-sm font-bold">
            {playerState.currentTrack?.title}
          </div>
          <div className="text-xs text-gray-400">
            {playerState.currentTrack?.artist}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={onToggleShuffle}>
          <Shuffle className="w-4 h-4" />
        </button>
        <button onClick={onPreviousTrack}>
          <SkipBack className="w-4 h-4" />
        </button>
        <button
          onClick={onTogglePlay}
          className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
        >
          {playerState.isPlaying ? (
            <Pause className="w-4 h-4 text-black" />
          ) : (
            <Play className="w-4 h-4 text-black" />
          )}
        </button>
        <button onClick={onNextTrack}>
          <SkipForward className="w-4 h-4" />
        </button>
        <button onClick={onToggleRepeat}>
          <Repeat className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-2 w-32">
        <Volume2 className="w-4 h-4" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolumeChange}
          defaultValue={1}
        />
      </div>
    </div>
  );
};

export default Player;
