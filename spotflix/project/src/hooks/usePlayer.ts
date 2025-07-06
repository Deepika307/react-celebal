import { useState, useCallback } from 'react';
import { Track, PlayerState } from '../types/music';

export const usePlayer = () => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    queue: [],
    currentIndex: 0,
    shuffle: false,
    repeat: 'off'
  });

  const playTrack = useCallback((track: Track, queue: Track[] = []) => {
    setPlayerState(prev => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      queue: queue.length > 0 ? queue : [track],
      currentIndex: queue.length > 0 ? queue.findIndex(t => t.id === track.id) : 0
    }));
  }, []);

  const togglePlay = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const nextTrack = useCallback(() => {
    setPlayerState(prev => {
      const nextIndex = prev.currentIndex + 1;
      if (nextIndex < prev.queue.length) {
        return {
          ...prev,
          currentIndex: nextIndex,
          currentTrack: prev.queue[nextIndex]
        };
      } else if (prev.repeat === 'all') {
        return {
          ...prev,
          currentIndex: 0,
          currentTrack: prev.queue[0]
        };
      }
      return prev;
    });
  }, []);

  const previousTrack = useCallback(() => {
    setPlayerState(prev => {
      const prevIndex = prev.currentIndex - 1;
      if (prevIndex >= 0) {
        return {
          ...prev,
          currentIndex: prevIndex,
          currentTrack: prev.queue[prevIndex]
        };
      } else if (prev.repeat === 'all') {
        const lastIndex = prev.queue.length - 1;
        return {
          ...prev,
          currentIndex: lastIndex,
          currentTrack: prev.queue[lastIndex]
        };
      }
      return prev;
    });
  }, []);

  const setVolume = useCallback((volume: number) => {
    setPlayerState(prev => ({ ...prev, volume }));
  }, []);

  const setCurrentTime = useCallback((time: number) => {
    setPlayerState(prev => ({ ...prev, currentTime: time }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setPlayerState(prev => ({ ...prev, shuffle: !prev.shuffle }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setPlayerState(prev => ({
      ...prev,
      repeat: prev.repeat === 'off' ? 'all' : prev.repeat === 'all' ? 'one' : 'off'
    }));
  }, []);

  return {
    playerState,
    playTrack,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    setCurrentTime,
    toggleShuffle,
    toggleRepeat
  };
};