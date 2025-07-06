import React from 'react';
import { Home, Search, Library, Plus, Heart, Download } from 'lucide-react';
import { Playlist } from '../types/music';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  playlists: Playlist[];
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, playlists }) => {
  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Library },
  ];

  const libraryItems = [
    { id: 'create-playlist', label: 'Create Playlist', icon: Plus },
    { id: 'liked', label: 'Liked Songs', icon: Heart },
    { id: 'downloaded', label: 'Downloaded Music', icon: Download },
  ];

  return (
    <div className="w-64 bg-black text-white h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-white text-2xl font-bold mb-8">Spotflix</h1>
        
        <nav className="space-y-2">
          {mainNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === item.id
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="px-6 py-4">
        <div className="space-y-2">
          {libraryItems.map(item => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === item.id
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 py-4">
        <hr className="border-gray-700 mb-4" />
        <div className="space-y-2">
          {playlists.map(playlist => (
            <button
              key={playlist.id}
              onClick={() => onViewChange(`playlist-${playlist.id}`)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                currentView === `playlist-${playlist.id}`
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <div className="truncate font-medium">{playlist.name}</div>
              <div className="text-sm text-gray-400 truncate">
                {playlist.createdBy} • {playlist.tracks.length} songs
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;