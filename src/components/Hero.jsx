import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Gamepad2, ArrowRight } from 'lucide-react';

const CARDS_DATA = [
  {
    letter: 'P',
    gradient: 'from-purple-400 via-indigo-300 to-indigo-500',
    glowColor: 'group-hover:shadow-purple-500/30 group-hover:border-purple-400/60',
    accent: 'bg-purple-500/20 text-purple-400'
  },
  {
    letter: 'L',
    gradient: 'from-indigo-400 via-cyan-300 to-blue-500',
    glowColor: 'group-hover:shadow-indigo-500/30 group-hover:border-indigo-400/60',
    accent: 'bg-indigo-500/20 text-indigo-400'
  },
  {
    letter: 'A',
    gradient: 'from-cyan-400 via-teal-300 to-emerald-400',
    glowColor: 'group-hover:shadow-cyan-500/30 group-hover:border-cyan-400/60',
    accent: 'bg-cyan-500/20 text-cyan-400'
  },
  {
    letter: 'Y',
    gradient: 'from-emerald-400 via-purple-300 to-purple-500',
    glowColor: 'group-hover:shadow-emerald-500/30 group-hover:border-emerald-400/60',
    accent: 'bg-emerald-500/20 text-emerald-400'
  }
];

export const SnakePlayHero = () => {
  const navigate = useNavigate();

  const handlePlayNow = () => {
    navigate('/games');
  };

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex flex-col items-center justify-center pt-8 pb-12 px-3 sm:px-6 lg:px-8 overflow-hidden select-none">

      {/* Subtle Background Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/12 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Badge & Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center flex flex-col items-center gap-2 mb-8 z-10"
      >
        {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 shadow-lg shadow-purple-950/40 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-extrabold tracking-widest text-slate-300 uppercase">
            ARCADE GAME UNIVERSE
          </span>
        </div> */}

        {/* <p className="text-sm sm:text-base md:text-lg text-slate-400 font-medium max-w-lg mt-1 px-2">
          Select your game, test your skills, and master the arcade.
        </p> */}
      </motion.div>

      {/* 4 CARDS IN ONE HORIZONTAL ROW (P - L - A - Y) */}
      <div className="w-full max-w-4xl mx-auto z-10">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 justify-center items-center w-full">
          {CARDS_DATA.map((card, idx) => (
            <motion.div
              key={card.letter}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.04 }}
              className={`group aspect-[3/4] w-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-900/90 border border-white/10 ${card.glowColor} shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md cursor-pointer`}
              onClick={handlePlayNow}
            >
              {/* Top Accent Icon */}
              <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl ${card.accent} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Main Card Letter */}
              <span className={`text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-tr ${card.gradient} drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300`}>
                {card.letter}
              </span>

              {/* Subtle Bottom Glow Line */}
              <div className="absolute bottom-0 inset-x-4 h-1 rounded-t-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* PLAY NOW → BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 sm:mt-10 z-10"
      >
        <motion.button
          onClick={handlePlayNow}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-base sm:text-xl tracking-wide flex items-center gap-3 shadow-2xl shadow-purple-950/50 border border-purple-400/30 transition-all duration-300 cursor-pointer group"
        >
          <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-12 transition-transform" />
          <span>PLAY NOW</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-1.5 transition-transform" />
        </motion.button>
      </motion.div>

    </section>
  );
};

export default SnakePlayHero;
