import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, ArrowRight } from 'lucide-react';
import heroBg from '../assets/hero-bg.jpg';

const CARDS_DATA = [
  {
    letter: 'G',
    bgColor: 'bg-[#FFF8E7]',
    letterColor: 'text-[#4098D8]',
    grassTop: 'bg-[#70D0F0]',
    badgeBg: 'bg-[#70D0F0]',
    badgeText: 'text-[#245E67]',
  },
  {
    letter: 'A',
    bgColor: 'bg-[#FFF8E7]',
    letterColor: 'text-[#4D9D67]',
    grassTop: 'bg-[#72C96B]',
    badgeBg: 'bg-[#72C96B]',
    badgeText: 'text-[#245E67]',
  },
  {
    letter: 'M',
    bgColor: 'bg-[#FFF8E7]',
    letterColor: 'text-[#E48170]',
    grassTop: 'bg-[#F09A79]',
    badgeBg: 'bg-[#E48170]',
    badgeText: 'text-[#FFF8E7]',
  },
  {
    letter: 'E',
    bgColor: 'bg-[#FFF8E7]',
    letterColor: 'text-[#905080]',
    grassTop: 'bg-[#B85F68]',
    badgeBg: 'bg-[#F5D66B]',
    badgeText: 'text-[#245E67]',
  },
  {
    letter: 'O',
    bgColor: 'bg-[#FFF8E7]',
    letterColor: 'text-[#E48170]',
    grassTop: 'bg-[#F09A79]',
    badgeBg: 'bg-[#F5D66B]',
    badgeText: 'text-[#245E67]',
  },
  {
    letter: 'V',
    bgColor: 'bg-[#FFF8E7]',
    letterColor: 'text-[#4098D8]',
    grassTop: 'bg-[#70D0F0]',
    badgeBg: 'bg-[#70D0F0]',
    badgeText: 'text-[#245E67]',
  },
  {
    letter: 'E',
    bgColor: 'bg-[#FFF8E7]',
    letterColor: 'text-[#4D9D67]',
    grassTop: 'bg-[#72C96B]',
    badgeBg: 'bg-[#72C96B]',
    badgeText: 'text-[#245E67]',
  },
  {
    letter: 'R',
    bgColor: 'bg-[#FFF8E7]',
    letterColor: 'text-[#905080]',
    grassTop: 'bg-[#B85F68]',
    badgeBg: 'bg-[#E48170]',
    badgeText: 'text-[#FFF8E7]',
  },
];

export const Hero = () => {
  const navigate = useNavigate();

  const handlePlayNow = () => {
    navigate('/games');
  };

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex flex-col items-center justify-center pt-8 pb-16 px-3 sm:px-6 lg:px-8 overflow-hidden select-none bg-[#4CA8E8]">
      
      {/* 2D Platformer Sky Scene Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sky Background Art - Clean un-tinted reference image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        {/* Soft Decorative Floating Clouds */}
        <motion.div 
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-[10%] w-36 h-12 bg-[#F4F3E6] rounded-full shadow-[inset_0_-4px_0_#D7EEF0] border-2 border-[#245E67]/20 opacity-90 hidden sm:block"
        />
        <motion.div 
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-24 right-[12%] w-44 h-14 bg-[#F4F3E6] rounded-full shadow-[inset_0_-5px_0_#D7EEF0] border-2 border-[#245E67]/20 opacity-90 hidden sm:block"
        />
      </div>

      {/* Hero Welcome Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="z-10 mb-6 sm:mb-8"
      >
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-black bg-[#FFF8E7] text-[#245E67] border-[3px] border-[#245E67] shadow-[3px_3px_0px_#905080]">
          <Gamepad2 className="w-4 h-4 text-[#E48170]" />
          WELCOME TO GAMEVERSE ARCADE
        </span>
      </motion.div>

      {/* 8 CARDS IN HORIZONTAL ROW (G A M E   O V E R) */}
      <div className="w-full max-w-6xl mx-auto z-10">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-3 md:gap-4 justify-center items-center w-full">
          {CARDS_DATA.map((card, idx) => (
            <motion.div
              key={`${card.letter}-${idx}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              whileHover={{ y: -6, scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`group aspect-[3/4] w-full rounded-xl sm:rounded-2xl md:rounded-3xl ${card.bgColor} border-[2.5px] sm:border-[3.5px] border-[#245E67] shadow-[3px_3px_0px_#905080] sm:shadow-[5px_5px_0px_#905080] hover:shadow-[6px_8px_0px_#905080] transition-all duration-200 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer`}
              onClick={handlePlayNow}
            >
              {/* Platformer Grass Top Edge Trim */}
              <div className={`absolute top-0 inset-x-0 h-2 sm:h-3 ${card.grassTop} border-b-2 border-[#245E67]`} />

              {/* Top Accent Icon Badge */}
              <div className={`absolute top-2 right-1.5 sm:top-3 sm:right-2 w-4 h-4 sm:w-6 sm:h-6 rounded-md ${card.badgeBg} ${card.badgeText} border sm:border-2 border-[#245E67] hidden sm:flex items-center justify-center shadow-xs`}>
                <Gamepad2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              </div>

              {/* Main Card Letter Tile */}
              <span className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black ${card.letterColor} text-shadow-teal drop-shadow-md transition-transform duration-200 group-hover:scale-105`}>
                {card.letter}
              </span>

              {/* Bottom Terrain Soil Block */}
              <div className="absolute bottom-0 inset-x-0 h-1.5 sm:h-2 bg-[#E48170] border-t-2 border-[#245E67]" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* PLAY NOW → BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="mt-8 sm:mt-12 z-10"
      >
        <button
          onClick={handlePlayNow}
          className="px-8 sm:px-12 py-3.5 sm:py-4.5 rounded-2xl bg-[#F5D66B] hover:bg-[#FBE585] text-[#245E67] font-black text-lg sm:text-2xl tracking-wide flex items-center gap-3 border-[3.5px] border-[#245E67] shadow-[5px_5px_0px_#905080] hover:shadow-[3px_3px_0px_#905080] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all duration-150 cursor-pointer group"
        >
          <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#245E67] group-hover:rotate-12 transition-transform" />
          <span>PLAY NOW</span>
          <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#245E67] group-hover:translate-x-2 transition-transform" />
        </button>
      </motion.div>

    </section>
  );
};

export default Hero;
