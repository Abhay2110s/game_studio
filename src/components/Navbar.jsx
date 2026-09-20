import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import { GAMES_DATA } from '../data/games';
import Button from './Button';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMuted, toggleSound, playClick } = useSound();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRandomPlay = () => {
    playClick();
    const randomIndex = Math.floor(Math.random() * GAMES_DATA.length);
    const selectedGame = GAMES_DATA[randomIndex];
    navigate(`/game/${selectedGame.slug}`);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Games', path: '/games' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#08090D]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={playClick}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
            <div className="w-full h-full bg-[#08090D] rounded-[10px] flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-purple-400 group-hover:text-cyan-300 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-wider text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-purple-400">
              GAME<span className="text-purple-500 group-hover:text-cyan-400 transition-colors">VERSE</span>
            </span>
            <span className="text-[10px] text-slate-400 tracking-widest uppercase font-semibold">
              Arcade Universe
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={playClick}
              className={`relative text-sm font-medium transition-colors duration-200 py-1 ${
                isActive(link.path)
                  ? 'text-purple-400 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Section: Sound Toggle & Play Now Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-red-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-cyan-400" />
            )}
          </button>

          <Button
            onClick={handleRandomPlay}
            variant="cyan"
            icon={Sparkles}
          >
            Play Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-slate-800/60 text-slate-300"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-cyan-400" />}
          </button>
          
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg bg-slate-800/80 text-slate-200 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/10 bg-[#11131A]/95 backdrop-blur-xl px-4 pt-3 pb-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Button
              onClick={handleRandomPlay}
              variant="cyan"
              icon={Sparkles}
              className="w-full mt-2"
            >
              Play Random Game
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
