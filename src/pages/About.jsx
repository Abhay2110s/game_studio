import React from 'react';
import { Gamepad2, Zap, Shield, Cpu, Code2, Sparkles } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[75vh] flex flex-col items-center justify-center">
      
      {/* Title */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-[#F5D66B] border-[3.5px] border-[#245E67] shadow-[4px_4px_0px_#905080] flex items-center justify-center mx-auto mb-4">
          <Gamepad2 className="w-9 h-9 text-[#245E67]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-[#FFF8E7] text-shadow-teal tracking-tight mb-2">
          ABOUT <span className="text-[#F5D66B]">GAMEVERSE</span>
        </h1>
        <p className="text-[#D7EEF0] text-sm md:text-base font-bold">
          "Six 2D games. One pixel universe."
        </p>
      </div>

      {/* Content Platformer Panel */}
      <div className="w-full bg-[#FFF8E7] rounded-3xl p-8 md:p-10 border-[3.5px] border-[#245E67] shadow-[6px_6px_0px_#905080] flex flex-col gap-8">
        
        <p className="text-[#245E67] text-base md:text-lg leading-relaxed text-center font-bold">
          GameVerse is a collection of classic retro mini-games built with React and JavaScript. Designed with a vibrant 2D pixel platformer aesthetic, it offers high-speed arcade entertainment with zero loading delays.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-2">
          <div className="bg-[#E2F1F8] p-5 rounded-2xl border-2 border-[#245E67] flex flex-col gap-2">
            <Zap className="w-6 h-6 text-[#72C96B]" />
            <h3 className="text-base font-black text-[#245E67]">Instant Gameplay</h3>
            <p className="text-xs text-[#4A5568] font-bold">
              No registration, no score persistence, no login screens. Click and play immediately.
            </p>
          </div>

          <div className="bg-[#E2F1F8] p-5 rounded-2xl border-2 border-[#245E67] flex flex-col gap-2">
            <Cpu className="w-6 h-6 text-[#4098D8]" />
            <h3 className="text-base font-black text-[#245E67]">Minimax AI & Physics</h3>
            <p className="text-xs text-[#4A5568] font-bold">
              Features custom HTML5 Canvas game loops, particle effects, and unbeatable Minimax AI.
            </p>
          </div>

          <div className="bg-[#E2F1F8] p-5 rounded-2xl border-2 border-[#245E67] flex flex-col gap-2">
            <Sparkles className="w-6 h-6 text-[#E48170]" />
            <h3 className="text-base font-black text-[#245E67]">Arcade Visuals</h3>
            <p className="text-xs text-[#4A5568] font-bold">
              Vibrant 16-bit pixel platformer visuals, smooth animations, and responsive controls.
            </p>
          </div>
        </div>

        {/* Tech Badges */}
        <div className="border-t-2 border-[#245E67]/20 pt-6 flex flex-wrap items-center justify-center gap-3">
          {['React 19', 'Vite', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'HTML5 Canvas', 'Lucide React'].map((tech) => (
            <span key={tech} className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-[#F5D66B] border-2 border-[#245E67] text-[#245E67] shadow-xs">
              {tech}
            </span>
          ))}
        </div>

      </div>

    </div>
  );
};

export default About;
