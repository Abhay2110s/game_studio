import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const Footer = () => {
  const { playClick } = useSound();

  return (
    <footer className="w-full border-t border-white/10 bg-[#08090D] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mt-12 sm:mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Brand Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <Link to="/" onClick={playClick} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5">
              <div className="w-full h-full bg-[#08090D] rounded-[6px] flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <span className="font-extrabold text-lg tracking-wider text-white">
              GAME<span className="text-purple-500">VERSE</span>
            </span>
          </Link>

        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 font-medium">
          <Link to="/" onClick={playClick} className="hover:text-purple-400 transition-colors">
            Home
          </Link>
          <Link to="/games" onClick={playClick} className="hover:text-purple-400 transition-colors">
            Games
          </Link>
          <Link to="/about" onClick={playClick} className="hover:text-purple-400 transition-colors">
            About
          </Link>

        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 font-medium">

        </div>
      </div>
    </footer>
  );
};

export default Footer;
