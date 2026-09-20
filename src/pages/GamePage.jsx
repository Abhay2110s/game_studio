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
      <div className="max-w-4xl mx-auto mt-6 sm:mt-8 bg-[#FFF8E7] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-[3.5px] border-[#245E67] shadow-[5px_5px_0px_#905080] flex flex-col md:flex-row justify-between gap-4 sm:gap-6 relative overflow-hidden">
        {/* Top grass edge decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#72C96B]" />
        
        {/* Left: Description & Rules */}
        <div className="flex-1 flex flex-col gap-2 mt-1">
          <div className="flex items-center gap-2 text-[#E48170] font-black text-sm uppercase tracking-wider">
            <Info className="w-4 h-4 text-[#245E67]" /> About {game.title}
          </div>
          <p className="text-[#245E67] text-sm leading-relaxed font-semibold">
            {game.description}
          </p>
        </div>

        {/* Right: Controls Quick Reference */}
        <div className="md:w-80 bg-[#E2F1F8] p-4 rounded-2xl border-2 border-[#245E67] flex flex-col gap-2">
          <span className="text-xs font-black text-[#245E67] uppercase tracking-wider">Controls & Keybinds</span>
          <ul className="text-xs text-[#245E67]/90 font-medium flex flex-col gap-1.5 list-disc list-inside">
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
