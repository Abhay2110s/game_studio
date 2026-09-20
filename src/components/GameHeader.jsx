import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Pause, Play, Trophy } from 'lucide-react';
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

  const handleBack = () => {
    navigate('/games');
  };

  return (
    <div className="w-full bg-[#FFF8E7] rounded-2xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-4 border-[3.5px] border-[#245E67] shadow-[4px_4px_0px_#905080]">
      
      {/* Top row: Back & Title */}
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

        <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight text-[#245E67] truncate flex-1 text-center">
          {title}
        </h1>
      </div>

      {/* Bottom row: Score panel + Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        
        {/* Score & Stats Display */}
        <div className="flex items-center gap-3 sm:gap-5 bg-[#E2F1F8] px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl border-2 border-[#245E67] shadow-inner">
          {score !== undefined && (
            <div className="flex flex-col items-center">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#245E67] font-extrabold">Score</span>
              <span className="text-base sm:text-xl font-black text-[#245E67]">{score}</span>
            </div>
          )}

          {highScore !== undefined && (
            <>
              <div className="w-0.5 h-6 sm:h-8 bg-[#245E67]/30" />
              <div className="flex flex-col items-center">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#245E67] font-extrabold flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-[#E48170]" /> Best
                </span>
                <span className="text-base sm:text-xl font-black text-[#E48170]">{highScore}</span>
              </div>
            </>
          )}

          {extraStat && (
            <>
              <div className="w-0.5 h-6 sm:h-8 bg-[#245E67]/30" />
              <div className="flex flex-col items-center">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#245E67] font-extrabold">{extraStat.label}</span>
                <span className="text-base sm:text-xl font-black text-[#4D9D67]">{extraStat.value}</span>
              </div>
            </>
          )}
        </div>

        {/* Actions: Pause & Restart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onPause && (
            <Button
              onClick={onPause}
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
              onClick={onRestart}
              variant="ghost"
              size="sm"
              icon={RotateCcw}
              className="border-2 border-[#245E67] bg-[#FFF8E7] hover:bg-white text-[#245E67] text-xs sm:text-sm shadow-xs"
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
