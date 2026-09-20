import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#030712] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mt-12 sm:mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Brand Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-[#030712] rounded-[6px] flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-cyan-400 group-hover:text-emerald-300 transition-colors" />
              </div>
            </div>
            <span className="font-extrabold text-lg tracking-wider text-white">
              GAME<span className="text-cyan-400 group-hover:text-emerald-400 transition-colors">VERSE</span>
            </span>
          </Link>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 font-medium">
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <Link to="/games" className="hover:text-cyan-400 transition-colors">
            Games
          </Link>
          <Link to="/about" className="hover:text-cyan-400 transition-colors">
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
