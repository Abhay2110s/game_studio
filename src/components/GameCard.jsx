import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Sparkles, Trophy } from 'lucide-react';
import Button from './Button';

// Custom SVG graphic preview generator for each game
const GamePreviewGraphic = ({ slug, accentColor }) => {
  switch (slug) {
    case 'snake':
      return (
        <svg className="w-full h-full text-emerald-400 opacity-90" viewBox="0 0 200 120" fill="none">
          <rect width="200" height="120" fill="#0D1117" />
          {/* Grid lines */}
          <path d="M0 40H200M0 80H200M40 0V120M80 0V120M120 0V120M160 0V120" stroke="#161B22" strokeWidth="1" />
          {/* Snake segments */}
          <rect x="40" y="40" width="18" height="18" rx="4" fill="#22C55E" />
          <rect x="60" y="40" width="18" height="18" rx="4" fill="#22C55E" />
          <rect x="80" y="40" width="18" height="18" rx="4" fill="#22C55E" />
          <rect x="80" y="60" width="18" height="18" rx="4" fill="#10B981" />
          <rect x="80" y="80" width="18" height="18" rx="4" fill="#34D399" />
          {/* Head eyes */}
          <circle cx="85" cy="85" r="2" fill="#000" />
          <circle cx="93" cy="85" r="2" fill="#000" />
          {/* Glowing Apple */}
          <circle cx="149" cy="49" r="8" fill="#EF4444" className="animate-pulse" />
          <path d="M149 41C149 39 151 38 152 38" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'tictactoe':
      return (
        <svg className="w-full h-full text-cyan-400 opacity-90" viewBox="0 0 200 120" fill="none">
          <rect width="200" height="120" fill="#0D1117" />
          <path d="M70 20V100M130 20V100M30 50H170M30 80H170" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          {/* X marks */}
          <path d="M40 25L58 43M58 25L40 43" stroke="#22D3EE" strokeWidth="4" strokeLinecap="round" />
          <path d="M140 55L158 73M158 55L140 73" stroke="#22D3EE" strokeWidth="4" strokeLinecap="round" />
          {/* O mark */}
          <circle cx="100" cy="34" r="10" stroke="#A855F7" strokeWidth="4" />
          <circle cx="49" cy="65" r="10" stroke="#A855F7" strokeWidth="4" />
          {/* Winning line */}
          <line x1="30" y1="34" x2="170" y2="34" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'memorymatch':
      return (
        <svg className="w-full h-full text-purple-400 opacity-90" viewBox="0 0 200 120" fill="none">
          <rect width="200" height="120" fill="#0D1117" />
          {/* Cards grid */}
          <rect x="25" y="20" width="32" height="42" rx="6" fill="#1F2937" stroke="#374151" strokeWidth="2" />
          <rect x="65" y="20" width="32" height="42" rx="6" fill="#8B5CF6" stroke="#C084FC" strokeWidth="2" />
          <rect x="105" y="20" width="32" height="42" rx="6" fill="#8B5CF6" stroke="#C084FC" strokeWidth="2" />
          <rect x="145" y="20" width="32" height="42" rx="6" fill="#1F2937" stroke="#374151" strokeWidth="2" />

          <rect x="45" y="68" width="32" height="42" rx="6" fill="#1F2937" stroke="#374151" strokeWidth="2" />
          <rect x="85" y="68" width="32" height="42" rx="6" fill="#1F2937" stroke="#374151" strokeWidth="2" />
          <rect x="125" y="68" width="32" height="42" rx="6" fill="#1F2937" stroke="#374151" strokeWidth="2" />

          {/* Matched Star Icons on open cards */}
          <path d="M81 33L83 38H88L84 41L85 46L81 43L77 46L78 41L74 38H79L81 33Z" fill="#FFF" />
          <path d="M121 33L123 38H128L124 41L125 46L121 43L117 46L118 41L114 38H119L121 33Z" fill="#FFF" />
        </svg>
      );
    case 'breakout':
      return (
        <svg className="w-full h-full text-pink-400 opacity-90" viewBox="0 0 200 120" fill="none">
          <rect width="200" height="120" fill="#0D1117" />
          {/* Bricks */}
          <rect x="15" y="15" width="30" height="10" rx="2" fill="#F43F5E" />
          <rect x="50" y="15" width="30" height="10" rx="2" fill="#FB7185" />
          <rect x="85" y="15" width="30" height="10" rx="2" fill="#F43F5E" />
          <rect x="120" y="15" width="30" height="10" rx="2" fill="#FB7185" />
          <rect x="155" y="15" width="30" height="10" rx="2" fill="#F43F5E" />

          <rect x="15" y="30" width="30" height="10" rx="2" fill="#8B5CF6" />
          <rect x="50" y="30" width="30" height="10" rx="2" fill="#A855F7" />
          <rect x="120" y="30" width="30" height="10" rx="2" fill="#A855F7" />
          <rect x="155" y="30" width="30" height="10" rx="2" fill="#8B5CF6" />

          {/* Paddle */}
          <rect x="70" y="100" width="60" height="8" rx="4" fill="#22D3EE" />
          {/* Ball & trajectory */}
          <circle cx="105" cy="80" r="5" fill="#FFF" />
          <path d="M105 80L135 48" stroke="#FFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        </svg>
      );
    case 'pong':
      return (
        <svg className="w-full h-full text-amber-400 opacity-90" viewBox="0 0 200 120" fill="none">
          <rect width="200" height="120" fill="#0D1117" />
          {/* Dashed center net line */}
          <line x1="100" y1="0" x2="100" y2="120" stroke="#374151" strokeWidth="3" strokeDasharray="6 6" />
          {/* Paddles */}
          <rect x="15" y="35" width="8" height="40" rx="3" fill="#F59E0B" />
          <rect x="177" y="55" width="8" height="40" rx="3" fill="#22D3EE" />
          {/* Ball */}
          <circle cx="120" cy="50" r="6" fill="#FFF" />
          {/* Motion trail */}
          <path d="M30 60L120 50" stroke="#F59E0B" strokeWidth="2" strokeDasharray="2 4" opacity="0.5" />
        </svg>
      );
    case 'spaceshooter':
      return (
        <svg className="w-full h-full text-indigo-400 opacity-90" viewBox="0 0 200 120" fill="none">
          <rect width="200" height="120" fill="#0D1117" />
          {/* Stars */}
          <circle cx="30" cy="20" r="1" fill="#FFF" />
          <circle cx="170" cy="30" r="1.5" fill="#FFF" />
          <circle cx="80" cy="70" r="1" fill="#FFF" />
          <circle cx="150" cy="90" r="1.5" fill="#FFF" />
          
          {/* Enemies */}
          <path d="M40 25L50 35L60 25L50 15Z" fill="#EF4444" />
          <path d="M100 25L110 35L120 25L110 15Z" fill="#F59E0B" />
          <path d="M150 25L160 35L170 25L160 15Z" fill="#EF4444" />

          {/* Lasers */}
          <line x1="95" y1="65" x2="95" y2="45" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />
          <line x1="105" y1="65" x2="105" y2="45" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />

          {/* Player Spaceship */}
          <path d="M100 80L115 105H85L100 80Z" fill="#8B5CF6" />
          <path d="M100 75L105 85H95L100 75Z" fill="#C084FC" />
        </svg>
      );
    default:
      return null;
  }
};

export const GameCard = ({ game }) => {
  const { title, description, category, difficulty, slug, badgeColor, tags } = game;
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate(`/game/${slug}`);
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-white/10 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-900/30 transition-all duration-300"
    >
      <div>
        {/* Card Header Illustration */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-950 flex items-center justify-center border-b border-white/5">
          <GamePreviewGraphic slug={slug} />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171A23] via-transparent to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${badgeColor} shadow-md`}>
              {category}
            </span>
          </div>

          {/* Difficulty Tag */}
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium text-slate-300 bg-slate-900/80 backdrop-blur-md border border-slate-700/60">
              {difficulty}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col gap-2.5">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag) => (
              <span key={tag} className="text-[11px] font-medium text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/40">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Play Action */}
      <div className="p-5 pt-0">
        <Button
          onClick={handlePlay}
          variant="primary"
          icon={Play}
          className="w-full group-hover:from-purple-500 group-hover:to-cyan-500"
        >
          Play Game
        </Button>
      </div>
    </motion.div>
  );
};

export default GameCard;
