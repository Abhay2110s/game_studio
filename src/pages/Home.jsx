import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Gamepad2, Play, Flame, ShieldCheck, Zap } from 'lucide-react';
import { GAMES_DATA } from '../data/games';
import GameCard from '../components/GameCard';
import Button from '../components/Button';
import { useSound } from '../context/SoundContext';

export const Home = () => {
  const navigate = useNavigate();
  const { playClick } = useSound();

  const handleRandomPlay = () => {
    playClick();
    const randomIndex = Math.floor(Math.random() * GAMES_DATA.length);
    const selectedGame = GAMES_DATA[randomIndex];
    navigate(`/game/${selectedGame.slug}`);
  };

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center pt-6 pb-10 sm:pt-8 sm:pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Abstract Background Particle Effects & Neon Rings */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px]" />
          
          {/* Subtle floating geometry shapes */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 left-10 opacity-20 hidden md:block"
          >
            <Gamepad2 className="w-20 h-20 text-purple-400" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 right-10 opacity-20 hidden md:block"
          >
            <Zap className="w-16 h-16 text-cyan-400" />
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center gap-5 sm:gap-8">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-purple-500/30 shadow-lg shadow-purple-900/20"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-extrabold tracking-widest text-slate-300 uppercase">
              Six games. One universe.
            </span>
          </motion.div>

          {/* Main Hero Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08]"
          >
            PLAY. COMPETE.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-400 text-glow-purple">
              REPEAT.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl font-medium leading-relaxed px-2"
          >
            A collection of six addictive mini-games built for quick, instant retro arcade fun directly in your browser.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto"
          >
            <Button
              onClick={() => {
                playClick();
                navigate('/games');
              }}
              variant="primary"
              size="lg"
              icon={Gamepad2}
              className="w-full sm:w-auto px-8"
            >
              Explore Games
            </Button>

            <Button
              onClick={handleRandomPlay}
              variant="cyan"
              size="lg"
              icon={Play}
              className="w-full sm:w-auto px-8"
            >
              Play Random Game
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FEATURED GAMES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Flame className="w-8 h-8 text-purple-500" />
              FEATURED GAMES
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Select your favorite arcade challenge and jump straight into the action.
            </p>
          </div>

          <Button
            onClick={() => {
              playClick();
              navigate('/games');
            }}
            variant="outline"
            size="sm"
          >
            View All 6 Games →
          </Button>
        </div>

        {/* 6 Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GAMES_DATA.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* SHORT ABOUT SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 text-center flex flex-col items-center gap-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">Pure Arcade Gaming</h3>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed font-medium">
            GameVerse is a collection of classic and modern mini-games built with React and JavaScript. Zero logins, zero ads, zero database bloat — just raw gameplay right in your browser.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Home;
