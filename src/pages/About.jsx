import React from 'react';
import { Gamepad2, Zap, Shield, Cpu, Code2, Sparkles } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[75vh] flex flex-col items-center justify-center">
      
      {/* Title */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-0.5 mx-auto mb-4 shadow-xl shadow-cyan-500/30">
          <div className="w-full h-full bg-[#030712] rounded-[14px] flex items-center justify-center">
            <Gamepad2 className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
          ABOUT <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent text-glow-cyan">GAMEVERSE</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base font-medium">
          "Six games. One universe."
        </p>
      </div>

      {/* Content Glass Panel */}
      <div className="w-full glass-panel rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl flex flex-col gap-8">
        
        <p className="text-slate-200 text-base md:text-lg leading-relaxed text-center font-medium">
          GameVerse is a collection of classic and modern mini-games built with React and JavaScript. Designed with a sleek retro-futuristic dark UI, it offers high-speed arcade entertainment with zero loading delays.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/5 flex flex-col gap-2">
            <Zap className="w-6 h-6 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Instant Gameplay</h3>
            <p className="text-xs text-slate-400">
              No registration, no score persistence, no login screens. Click and play immediately.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/5 flex flex-col gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Minimax AI & Physics</h3>
            <p className="text-xs text-slate-400">
              Features custom HTML5 Canvas game loops, particle effects, and unbeatable Minimax AI.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/5 flex flex-col gap-2">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Arcade Visuals</h3>
            <p className="text-xs text-slate-400">
              Vibrant neon cyberpunk themes, smooth framerate animations, and responsive controls.
            </p>
          </div>
        </div>

        {/* Tech Badges */}
        <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-center gap-3">
          {['React 19', 'Vite', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'HTML5 Canvas', 'Lucide React'].map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
              {tech}
            </span>
          ))}
        </div>

      </div>

    </div>
  );
};

export default About;
