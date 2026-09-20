import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full border-t-[4px] border-[#245E67] bg-[#E48170] relative mt-12 sm:mt-20">
      {/* Top Layered Grass Border */}
      <div className="w-full h-3 bg-[#72C96B] border-b-2 border-[#245E67]" />
      
      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Brand Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#F5D66B] border-[2.5px] border-[#245E67] shadow-[2px_2px_0px_#905080] flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-[#245E67]" />
            </div>
            <span className="font-black text-xl tracking-wider text-[#FFF8E7] text-shadow-teal">
              GAME<span className="text-[#F5D66B]">VERSE</span>
            </span>
          </Link>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-black text-[#FFF8E7]">
          <Link to="/" className="hover:text-[#F5D66B] transition-colors">
            Home
          </Link>
          <Link to="/games" className="hover:text-[#F5D66B] transition-colors">
            Games
          </Link>
          <Link to="/about" className="hover:text-[#F5D66B] transition-colors">
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
