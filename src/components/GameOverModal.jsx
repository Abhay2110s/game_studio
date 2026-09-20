import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Grid, Skull, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';
import Button from './Button';

export const GameOverModal = ({
  isOpen,
  isVictory = false,
  score,
  highScore,
  customMessage,
  stats = [],
  onRestart,
  onBack,
}) => {
  useEffect(() => {
    if (isOpen && isVictory) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#22D3EE', '#22C55E', '#F59E0B'],
        });
      } catch (e) {
        // ignore if canvas unavailable
      }
    }
  }, [isOpen, isVictory]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-[#245E67]/60 backdrop-blur-md safe-bottom">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-[#FFF8E7] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 text-center border-[3.5px] border-[#245E67] shadow-[6px_6px_0px_#905080] relative overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Top grass trim */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#72C96B]" />

          {/* Header Icon */}
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3 sm:mb-4 relative mt-1">
            {isVictory ? (
              <div className="w-full h-full rounded-full bg-[#F5D66B] border-2 border-[#245E67] p-1 shadow-[3px_3px_0px_#905080] animate-bounce flex items-center justify-center">
                <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-[#245E67]" />
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-[#E48170] border-2 border-[#245E67] p-1 shadow-[3px_3px_0px_#905080] flex items-center justify-center">
                <Skull className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFF8E7]" />
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-[#245E67] tracking-tight mb-1">
            {isVictory ? (
              <span className="text-[#E48170]">
                VICTORY!
              </span>
            ) : (
              <span className="text-[#B85F68]">
                GAME OVER
              </span>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-[#245E67]/80 mb-4 sm:mb-6 font-medium">
            {customMessage || (isVictory ? 'Outstanding play! You mastered the challenge.' : 'Better luck next time! Give it another try.')}
          </p>

          {/* Score & Stats Container */}
          <div className="bg-[#E2F1F8] rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-[#245E67] mb-4 sm:mb-6 flex flex-col gap-2 sm:gap-3">
            {score !== undefined && (
              <div className="flex justify-between items-center px-2 sm:px-3 py-1">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#245E67]/70 font-bold">Final Score</span>
                <span className="text-xl sm:text-2xl font-black text-[#245E67]">{score}</span>
              </div>
            )}

            {highScore !== undefined && (
              <div className="flex justify-between items-center px-2 sm:px-3 py-1 border-t border-[#245E67]/20">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#245E67]/70 font-bold flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E48170]" /> Session Best
                </span>
                <span className="text-lg sm:text-xl font-black text-[#E48170]">{highScore}</span>
              </div>
            )}

            {stats.map((st) => (
              <div key={st.label} className="flex justify-between items-center px-2 sm:px-3 py-1 border-t border-[#245E67]/20">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#245E67]/70 font-bold">{st.label}</span>
                <span className="text-sm sm:text-base font-black text-[#245E67]">{st.value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              onClick={onRestart}
              variant="primary"
              icon={RotateCcw}
              className="w-full py-2.5 sm:py-3"
            >
              Play Again
            </Button>

            <Button
              onClick={onBack}
              variant="secondary"
              icon={Grid}
              className="w-full py-2.5 sm:py-3"
            >
              Games List
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GameOverModal;
