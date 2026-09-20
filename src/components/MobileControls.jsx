import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

export const MobileControls = ({
  onUp,
  onDown,
  onLeft,
  onRight,
  onAction,
  actionLabel = 'ACTION',
  showDPad = true,
  showHorizontalOnly = false,
}) => {
  // Helper to prevent default touch events and fire callback
  const touchHandler = (callback) => ({
    onTouchStart: (e) => { e.preventDefault(); callback?.(); },
    onTouchEnd: (e) => { e.preventDefault(); },
    onClick: (e) => { e.preventDefault(); callback?.(); },
  });

  const btnBase = "rounded-xl bg-slate-800 active:bg-purple-600 text-white flex items-center justify-center border border-slate-700 active:scale-90 shadow-md transition-transform select-none";

  return (
    <div className="w-full mt-3 flex items-center justify-between gap-3 p-3 sm:p-4 bg-slate-950/80 rounded-2xl border border-white/10 select-none">
      
      {/* D-Pad Container */}
      {showDPad && (
        <div className="flex flex-col items-center gap-1.5">
          {!showHorizontalOnly && (
            <button
              {...touchHandler(onUp)}
              className={`w-14 h-14 sm:w-16 sm:h-16 ${btnBase}`}
              aria-label="Up"
            >
              <ChevronUp className="w-7 h-7" />
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              {...touchHandler(onLeft)}
              className={`w-14 h-14 sm:w-16 sm:h-16 ${btnBase}`}
              aria-label="Left"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              {...touchHandler(onRight)}
              className={`w-14 h-14 sm:w-16 sm:h-16 ${btnBase}`}
              aria-label="Right"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {!showHorizontalOnly && (
            <button
              {...touchHandler(onDown)}
              className={`w-14 h-14 sm:w-16 sm:h-16 ${btnBase}`}
              aria-label="Down"
            >
              <ChevronDown className="w-7 h-7" />
            </button>
          )}
        </div>
      )}

      {/* Action Button */}
      {onAction && (
        <div className="flex items-center justify-end flex-1">
          <button
            {...touchHandler(onAction)}
            className="px-5 py-4 sm:px-6 sm:py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 active:from-purple-500 active:to-cyan-500 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 border border-purple-400/30 shadow-lg shadow-purple-900/40 active:scale-95 select-none transition-transform"
            aria-label={actionLabel}
          >
            <Zap className="w-5 h-5 fill-current" />
            <span>{actionLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileControls;
