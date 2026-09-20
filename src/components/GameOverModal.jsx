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
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md safe-bottom">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-md glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 text-center border border-white/15 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Header Icon */}
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3 sm:mb-4 relative">
            {isVictory ? (
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-1 shadow-lg shadow-amber-500/40 animate-bounce">
                <div className="w-full h-full bg-[#0B0F19] rounded-full flex items-center justify-center">
                  <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
                </div>
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-red-600 to-rose-400 p-1 shadow-lg shadow-red-500/40">
                <div className="w-full h-full bg-[#0B0F19] rounded-full flex items-center justify-center">
                  <Skull className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" />
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
            {isVictory ? (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400">
                VICTORY!
              </span>
            ) : (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-600">
                GAME OVER
              </span>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mb-4 sm:mb-6">
            {customMessage || (isVictory ? 'Outstanding play! You mastered the challenge.' : 'Better luck next time! Give it another try.')}
          </p>

          {/* Score & Stats Container */}
          <div className="bg-slate-950/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 mb-4 sm:mb-6 flex flex-col gap-2 sm:gap-3">
            {score !== undefined && (
              <div className="flex justify-between items-center px-2 sm:px-3 py-1">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold">Final Score</span>
                <span className="text-xl sm:text-2xl font-black text-cyan-400">{score}</span>
              </div>
            )}

            {highScore !== undefined && (
              <div className="flex justify-between items-center px-2 sm:px-3 py-1 border-t border-white/5">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /> Session Best
                </span>
                <span className="text-lg sm:text-xl font-bold text-amber-400">{highScore}</span>
              </div>
            )}

            {stats.map((st) => (
              <div key={st.label} className="flex justify-between items-center px-2 sm:px-3 py-1 border-t border-white/5">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold">{st.label}</span>
                <span className="text-sm sm:text-base font-bold text-cyan-300">{st.value}</span>
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
