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
    <header className="sticky top-0 z-40 w-full border-b-[4px] border-[#245E67] bg-[#4CA8E8] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F5D66B] border-[3px] border-[#245E67] shadow-[3px_3px_0px_#905080] group-hover:scale-105 transition-transform flex items-center justify-center">
            <Gamepad2 className="w-6 h-6 text-[#245E67]" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-wider text-[#FFF8E7] text-shadow-teal">
              GAME<span className="text-[#F5D66B]">VERSE</span>
            </span>
            <span className="text-[10px] text-[#D7EEF0] tracking-widest uppercase font-extrabold">
              2D Arcade Universe
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative text-sm font-black transition-all px-4 py-2 rounded-xl border-[2.5px] ${
                isActive(link.path)
                  ? 'bg-[#FFF8E7] text-[#245E67] border-[#245E67] shadow-[3px_3px_0px_#905080]'
                  : 'bg-transparent text-[#FFF8E7] border-transparent hover:bg-[#FFF8E7]/20'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Section: Play Now Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            onClick={handleRandomPlay}
            variant="primary"
            icon={Sparkles}
          >
            Play Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#FFF8E7] border-[3px] border-[#245E67] text-[#245E67] shadow-[3px_3px_0px_#905080]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#245E67]" /> : <Menu className="w-6 h-6 text-[#245E67]" />}
          </button>
        </div>
      </div>

      {/* Layered Grass Bottom Border */}
      <div className="w-full h-2 bg-[#72C96B] border-t border-[#B6E06F]" />

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b-[3px] border-[#245E67] bg-[#70D0F0] px-4 pt-3 pb-6 flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3.5 rounded-xl text-base font-black border-[2.5px] transition-all ${
                  isActive(link.path)
                    ? 'bg-[#FFF8E7] text-[#245E67] border-[#245E67] shadow-[3px_3px_0px_#905080]'
                    : 'text-[#FFF8E7] border-transparent hover:bg-[#FFF8E7]/20'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Button
              onClick={handleRandomPlay}
              variant="primary"
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
