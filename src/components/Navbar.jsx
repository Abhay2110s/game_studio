import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Menu, X, Sparkles } from 'lucide-react';
import { GAMES_DATA } from '../data/games';
import Button from './Button';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRandomPlay = () => {
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
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#030712]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-400/50 transition-all duration-300">
            <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-cyan-400 group-hover:text-emerald-300 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-wider text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-cyan-300">
              GAME<span className="text-cyan-400 group-hover:text-emerald-400 transition-colors">VERSE</span>
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
              className={`relative text-sm font-medium transition-colors duration-200 py-1 ${
                isActive(link.path)
                  ? 'text-cyan-400 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-[0_0_8px_#06B6D4]"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Section: Play Now Button */}
        <div className="hidden md:flex items-center gap-4">
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6 text-cyan-400" />}
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
            className="md:hidden border-b border-white/10 bg-[#0B0F19]/95 backdrop-blur-xl px-4 pt-3 pb-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3.5 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                    : 'text-slate-300 hover:bg-slate-900/60'
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
