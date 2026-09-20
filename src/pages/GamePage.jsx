import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { GAMES_DATA } from '../data/games';
import Snake from '../games/Snake/Snake';
import TicTacToe from '../games/TicTacToe/TicTacToe';
import MemoryMatch from '../games/MemoryMatch/MemoryMatch';
import Breakout from '../games/Breakout/Breakout';
import Pong from '../games/Pong/Pong';
import SpaceShooter from '../games/SpaceShooter/SpaceShooter';
import { Info } from 'lucide-react';

export const GamePage = () => {
  const { slug } = useParams();

  const game = GAMES_DATA.find((g) => g.slug === slug);

  if (!game) {
    return <Navigate to="/games" replace />;
  }

  const renderGameComponent = () => {
    switch (slug) {
      case 'snake': return <Snake />;
      case 'tictactoe': return <TicTacToe />;
      case 'memorymatch': return <MemoryMatch />;
      case 'breakout': return <Breakout />;
      case 'pong': return <Pong />;
      case 'spaceshooter': return <SpaceShooter />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-6">
      
      {/* Active Game View Component */}
      <div className="w-full">
        {renderGameComponent()}
      </div>

      {/* Below Game Area: Instructions & Controls Info */}
      <div className="max-w-4xl mx-auto mt-6 sm:mt-8 glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
        
        {/* Left: Description & Rules */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-wider">
            <Info className="w-4 h-4" /> About {game.title}
          </div>
          <p className="text-slate-300 text-sm leading-relaxed font-medium">
            {game.description}
          </p>
        </div>

        {/* Right: Controls Quick Reference */}
        <div className="md:w-80 bg-slate-900/90 p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Controls & Keybinds</span>
          <ul className="text-xs text-slate-400 flex flex-col gap-1.5 list-disc list-inside">
            {game.controls.map((ctrl, i) => (
              <li key={i} className="leading-normal">{ctrl}</li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};

export default GamePage;
