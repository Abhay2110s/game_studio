import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

export const MobileControls = ({
  onUp,
  onDown,
  onLeft,
  onRight,
  onAction,
  onUpStart,
  onUpEnd,
  onDownStart,
  onDownEnd,
  actionLabel = 'ACTION',
  showDPad = true,
  showHorizontalOnly = false,
  showVerticalOnly = false,
}) => {
  // Helper for single click events
  const touchHandler = (callback) => ({
    onTouchStart: (e) => { e.preventDefault(); callback?.(); },
    onTouchEnd: (e) => { e.preventDefault(); },
    onClick: (e) => { e.preventDefault(); callback?.(); },
  });

  // Helper for continuous press-and-hold events
  const touchHoldHandler = (onStart, onEnd) => ({
    onTouchStart: (e) => { e.preventDefault(); onStart?.(); },
    onTouchEnd: (e) => { e.preventDefault(); onEnd?.(); },
    onTouchCancel: (e) => { e.preventDefault(); onEnd?.(); },
    onMouseDown: (e) => { e.preventDefault(); onStart?.(); },
    onMouseUp: (e) => { e.preventDefault(); onEnd?.(); },
    onMouseLeave: (e) => { e.preventDefault(); onEnd?.(); },
  });

  const btnBase = "rounded-xl bg-slate-800 active:bg-purple-600 text-white flex items-center justify-center border border-slate-700 active:scale-90 shadow-md transition-transform select-none";

  // Specialized 2-Button Vertical Controls (for Pong)
  if (showVerticalOnly) {
    return (
      <div className="w-full max-w-[480px] mx-auto mt-4 flex flex-col items-center gap-3 p-3 sm:p-4 bg-slate-950/90 rounded-2xl border border-white/10 select-none touch-none">
        {/* UP BUTTON */}
        <button
          {...touchHoldHandler(onUpStart || onUp, onUpEnd)}
          className="w-full py-4 sm:py-5 rounded-2xl bg-amber-500/20 active:bg-amber-500 border border-amber-500/40 text-amber-300 active:text-white flex flex-col items-center justify-center gap-1 shadow-lg active:scale-95 transition-all select-none touch-none cursor-pointer"
          aria-label="Up"
        >
          <ChevronUp className="w-8 h-8" />
          <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase">UP</span>
        </button>

        {/* DOWN BUTTON */}
        <button
          {...touchHoldHandler(onDownStart || onDown, onDownEnd)}
          className="w-full py-4 sm:py-5 rounded-2xl bg-amber-500/20 active:bg-amber-500 border border-amber-500/40 text-amber-300 active:text-white flex flex-col items-center justify-center gap-1 shadow-lg active:scale-95 transition-all select-none touch-none cursor-pointer"
          aria-label="Down"
        >
          <ChevronDown className="w-8 h-8" />
          <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase">DOWN</span>
        </button>
      </div>
    );
  }

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
