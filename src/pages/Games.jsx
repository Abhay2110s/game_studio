import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Gamepad2, Filter } from 'lucide-react';
import { GAMES_DATA, CATEGORIES } from '../data/games';
import GameCard from '../components/GameCard';
import { useSound } from '../context/SoundContext';

export const Games = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { playClick } = useSound();

  const filteredGames = GAMES_DATA.filter((game) => {
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-10 min-h-[80vh]">
      
      {/* Header Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2 sm:mb-3">
          CHOOSE YOUR <span className="text-purple-400 text-glow-purple">GAME</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base font-medium">
          Browse through our arcade catalog of 6 mini-games. Filter by category or search by keyword.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 glass-panel p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl border border-white/10 shadow-xl">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/30 border border-purple-400/30'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-3xl border border-white/10 p-8 max-w-md mx-auto">
          <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-1">No Games Found</h3>
          <p className="text-slate-400 text-xs">
            No games matching "{searchQuery}". Try searching for another keyword or clear filters.
          </p>
        </div>
      )}

    </div>
  );
};

export default Games;
