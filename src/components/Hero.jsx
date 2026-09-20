import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, ArrowRight } from 'lucide-react';

const CARDS_DATA = [
  {
    letter: 'P',
    gradient: 'from-emerald-400 via-teal-300 to-cyan-500',
    glowColor: 'group-hover:shadow-emerald-500/40 group-hover:border-emerald-400/60',
    accent: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
  },
  {
    letter: 'L',
    gradient: 'from-cyan-400 via-sky-300 to-indigo-500',
    glowColor: 'group-hover:shadow-cyan-500/40 group-hover:border-cyan-400/60',
    accent: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
  },
  {
    letter: 'A',
    gradient: 'from-indigo-400 via-purple-300 to-fuchsia-500',
    glowColor: 'group-hover:shadow-indigo-500/40 group-hover:border-indigo-400/60',
    accent: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
  },
  {
    letter: 'Y',
    gradient: 'from-rose-400 via-pink-300 to-amber-400',
    glowColor: 'group-hover:shadow-rose-500/40 group-hover:border-rose-400/60',
    accent: 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
  }
];

export const Hero = () => {
  const navigate = useNavigate();

  const handlePlayNow = () => {
    navigate('/games');
  };

  return (
    <section className="relative min-h-[65vh] sm:min-h-[75vh] flex flex-col items-center justify-center pt-8 pb-12 px-3 sm:px-6 lg:px-8 overflow-hidden select-none">
      
      {/* Rich Vibrant Background Ambient Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/15 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-emerald-500/12 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[350px] bg-indigo-600/15 rounded-full blur-[140px]" />
      </div>

      {/* 4 CARDS IN ONE HORIZONTAL ROW (P - L - A - Y) */}
      <div className="w-full max-w-4xl mx-auto z-10">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 justify-center items-center w-full">
          {CARDS_DATA.map((card, idx) => (
            <motion.div
              key={card.letter}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className={`group aspect-[3/4] w-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-900/95 via-[#0B0F19]/95 to-slate-900/95 border border-white/10 ${card.glowColor} shadow-2xl hover:shadow-cyan-900/30 transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl cursor-pointer`}
              onClick={handlePlayNow}
            >
              {/* Top Accent Icon */}
              <div className={`absolute top-2 right-2 sm:top-3.5 sm:right-3.5 w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl ${card.accent} flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity shadow-sm`}>
                <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Main Card Letter */}
              <span className={`text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-tr ${card.gradient} drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300`}>
                {card.letter}
              </span>

              {/* Subtle Bottom Glow Line */}
              <div className="absolute bottom-0 inset-x-4 h-1 rounded-t-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* PLAY NOW → BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 sm:mt-12 z-10"
      >
        <motion.button
          onClick={handlePlayNow}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="px-8 sm:px-12 py-3.5 sm:py-4.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-lg sm:text-2xl tracking-wide flex items-center gap-3 shadow-2xl shadow-emerald-500/30 hover:shadow-cyan-400/50 border border-emerald-300/40 transition-all duration-300 cursor-pointer group"
        >
          <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 group-hover:rotate-12 transition-transform" />
          <span>PLAY NOW</span>
          <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 group-hover:translate-x-2 transition-transform" />
        </motion.button>
      </motion.div>

    </section>
  );
};

export default Hero;
