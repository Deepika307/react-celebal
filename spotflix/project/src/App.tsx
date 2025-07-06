import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import PlaylistView from "./components/PlaylistView";
import Player from "./components/Player";
import Callback from "./pages/Callback";

import { usePlayer } from "./hooks/usePlayer";
import { mockTracks, mockPlaylists, mockAlbums } from "./data/mockData";
import { Playlist } from "./types/music";

const Home = () => {
  const [currentView, setCurrentView] = useState("home");
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );

  const {
    playerState,
    playTrack,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    setCurrentTime,
    toggleShuffle,
    toggleRepeat,
  } = usePlayer();

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      <Sidebar
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          setSelectedPlaylist(null); // Reset playlist if changing view
        }}
        playlists={mockPlaylists}
      />

      {selectedPlaylist ? (
        <PlaylistView
          playlist={selectedPlaylist}
          onBack={() => setSelectedPlaylist(null)}
          onPlayTrack={playTrack}
          currentTrack={playerState.currentTrack}
          isPlaying={playerState.isPlaying}
        />
      ) : (
        <MainContent
          currentView={currentView}
          playlists={mockPlaylists}
          albums={mockAlbums}
          tracks={mockTracks}
          onPlayTrack={playTrack}
          currentTrack={playerState.currentTrack}
          isPlaying={playerState.isPlaying}
          selectedPlaylist={selectedPlaylist}
          onSelectPlaylist={setSelectedPlaylist}
        />
      )}

      <Player
        playerState={playerState}
        onTogglePlay={togglePlay}
        onNextTrack={nextTrack}
        onPreviousTrack={previousTrack}
        onToggleShuffle={toggleShuffle}
        onToggleRepeat={toggleRepeat}
        onVolumeChange={setVolume}
        onSeek={setCurrentTime}
      />
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
