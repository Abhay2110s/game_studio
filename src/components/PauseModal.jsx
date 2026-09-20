import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Grid, PauseCircle } from 'lucide-react';
import Button from './Button';

export const PauseModal = ({ isOpen, onResume, onRestart, onBack }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-[#245E67]/60 backdrop-blur-md safe-bottom">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full max-w-sm bg-[#FFF8E7] rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center border-[3.5px] border-[#245E67] shadow-[6px_6px_0px_#905080] relative overflow-hidden"
        >
          {/* Top grass trim */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#72C96B]" />

          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F5D66B] border-2 border-[#245E67] flex items-center justify-center mb-3 sm:mb-4 mt-1 shadow-[3px_3px_0px_#905080]">
            <PauseCircle className="w-7 h-7 sm:w-8 sm:h-8 text-[#245E67]" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#245E67] mb-1 sm:mb-2">GAME PAUSED</h2>
          <p className="text-xs sm:text-sm text-[#245E67]/80 font-medium mb-4 sm:mb-6">Take a breather or restart when ready!</p>

          <div className="flex flex-col gap-2 sm:gap-3">
            <Button
              onClick={onResume}
              variant="primary"
              icon={Play}
              className="w-full py-2.5 sm:py-3"
            >
              Resume Game
            </Button>

            <Button
              onClick={onRestart}
              variant="secondary"
              icon={RotateCcw}
              className="w-full py-2.5 sm:py-3"
            >
              Restart
            </Button>

            <Button
              onClick={onBack}
              variant="outline"
              icon={Grid}
              className="w-full py-2.5 sm:py-3"
            >
              Exit to Arcade
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PauseModal;
