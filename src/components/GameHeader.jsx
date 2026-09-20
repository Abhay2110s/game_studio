import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Pause, Play, Trophy, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import Button from './Button';

export const GameHeader = ({
  title,
  score,
  highScore,
  extraStat,
  onPause,
  onRestart,
  isPaused,
}) => {
  const navigate = useNavigate();
  const { isMuted, toggleSound, playClick } = useSound();

  const handleBack = () => {
    playClick();
    navigate('/games');
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-4 border border-white/10 shadow-xl">
      
      {/* Top row: Back, Title, Sound toggle */}
      <div className="flex items-center gap-2 sm:gap-4 justify-between">
        <Button
          onClick={handleBack}
          variant="secondary"
          size="sm"
          icon={ArrowLeft}
          className="text-xs sm:text-sm"
        >
          <span className="hidden sm:inline">Back</span>
        </Button>

        <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight text-white truncate flex-1 text-center">
          {title}
        </h1>

        {/* Sound toggle — always visible */}
        <button
          onClick={toggleSound}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
        </button>
      </div>

      {/* Bottom row: Score panel + Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        
        {/* Score & Stats Display */}
        <div className="flex items-center gap-3 sm:gap-5 bg-slate-900/90 px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl border border-white/10 shadow-inner">
          {score !== undefined && (
            <div className="flex flex-col items-center">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold">Score</span>
              <span className="text-base sm:text-xl font-extrabold text-cyan-400 text-glow-cyan">{score}</span>
            </div>
          )}

          {highScore !== undefined && (
            <>
              <div className="w-px h-6 sm:h-8 bg-slate-800" />
              <div className="flex flex-col items-center">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-amber-400" /> Best
                </span>
                <span className="text-base sm:text-xl font-extrabold text-amber-400">{highScore}</span>
              </div>
            </>
          )}

          {extraStat && (
            <>
              <div className="w-px h-6 sm:h-8 bg-slate-800" />
              <div className="flex flex-col items-center">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold">{extraStat.label}</span>
                <span className="text-base sm:text-xl font-extrabold text-purple-400">{extraStat.value}</span>
              </div>
            </>
          )}
        </div>

        {/* Actions: Pause & Restart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onPause && (
            <Button
              onClick={() => {
                playClick();
                onPause();
              }}
              variant="secondary"
              size="sm"
              icon={isPaused ? Play : Pause}
              className="text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">{isPaused ? 'Resume' : 'Pause'}</span>
            </Button>
          )}

          {onRestart && (
            <Button
              onClick={() => {
                playClick();
                onRestart();
              }}
              variant="ghost"
              size="sm"
              icon={RotateCcw}
              className="border border-purple-500/30 hover:bg-purple-500/20 text-purple-300 text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">Restart</span>
            </Button>
          )}
        </div>

      </div>
    </div>
  );
};

export default GameHeader;
