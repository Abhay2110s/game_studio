import React, { useState } from 'react';
import { Search, Gamepad2 } from 'lucide-react';
import { GAMES_DATA, CATEGORIES } from '../data/games';
import GameCard from '../components/GameCard';

export const Games = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FFF8E7] text-shadow-teal tracking-tight mb-2 sm:mb-3">
          CHOOSE YOUR <span className="text-[#F5D66B]">GAME</span>
        </h1>
        <p className="text-[#D7EEF0] text-sm md:text-base font-bold">
          Browse through our arcade catalog of 6 mini-games. Filter by category or search by keyword.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 bg-[#FFF8E7] p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-[3.5px] border-[#245E67] shadow-[5px_5px_0px_#905080]">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#245E67]" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border-2 border-[#245E67] text-[#245E67] font-bold placeholder-[#245E67]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#245E67]"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border-2 border-[#245E67] ${
                selectedCategory === cat
                  ? 'bg-[#F5D66B] text-[#245E67] shadow-[3px_3px_0px_#905080]'
                  : 'bg-[#E2F1F8] hover:bg-white text-[#245E67]'
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
