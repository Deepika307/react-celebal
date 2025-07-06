// src/context/PlayerContext.tsx
import React, { createContext, useState, ReactNode } from "react";

export type Track = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audio: string;
};

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  trackQueue: Track[];
  currentIndex: number;
  setTrack: (track: Track, queue?: Track[]) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [trackQueue, setTrackQueue] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const setTrack = (track: Track, queue: Track[] = []) => {
    setCurrentTrack(track);
    setTrackQueue(queue);
    const index = queue.findIndex((t) => t.id === track.id);
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playNext = () => {
    if (currentIndex >= 0 && currentIndex < trackQueue.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentTrack(trackQueue[nextIndex]);
      setCurrentIndex(nextIndex);
      setIsPlaying(true);
    }
  };

  const playPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentTrack(trackQueue[prevIndex]);
      setCurrentIndex(prevIndex);
      setIsPlaying(true);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        trackQueue,
        currentIndex,
        setTrack,
        togglePlayPause,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
