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

  const btnBase = "rounded-xl bg-[#FFF8E7] active:bg-[#F5D66B] text-[#245E67] flex items-center justify-center border-[2.5px] border-[#245E67] active:scale-95 shadow-[3px_3px_0px_#905080] transition-transform select-none";

  // Specialized 2-Button Vertical Controls (for Pong)
  if (showVerticalOnly) {
    return (
      <div className="w-full max-w-[480px] mx-auto mt-4 flex flex-col items-center gap-3 p-3 sm:p-4 bg-[#FFF8E7] rounded-2xl border-[3.5px] border-[#245E67] shadow-[5px_5px_0px_#905080] select-none touch-none">
        {/* UP BUTTON */}
        <button
          {...touchHoldHandler(onUpStart || onUp, onUpEnd)}
          className="w-full py-4 sm:py-5 rounded-2xl bg-[#F5D66B] active:bg-[#FBE585] border-[3px] border-[#245E67] text-[#245E67] flex flex-col items-center justify-center gap-1 shadow-[4px_4px_0px_#905080] active:translate-y-1 active:shadow-none transition-all select-none touch-none cursor-pointer"
          aria-label="Up"
        >
          <ChevronUp className="w-8 h-8 text-[#245E67]" />
          <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-[#245E67]">UP</span>
        </button>

        {/* DOWN BUTTON */}
        <button
          {...touchHoldHandler(onDownStart || onDown, onDownEnd)}
          className="w-full py-4 sm:py-5 rounded-2xl bg-[#F5D66B] active:bg-[#FBE585] border-[3px] border-[#245E67] text-[#245E67] flex flex-col items-center justify-center gap-1 shadow-[4px_4px_0px_#905080] active:translate-y-1 active:shadow-none transition-all select-none touch-none cursor-pointer"
          aria-label="Down"
        >
          <ChevronDown className="w-8 h-8 text-[#245E67]" />
          <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-[#245E67]">DOWN</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mt-3 flex items-center justify-between gap-3 p-3 sm:p-4 bg-[#FFF8E7] rounded-2xl border-[3.5px] border-[#245E67] shadow-[5px_5px_0px_#905080] select-none">
      
      {/* D-Pad Container */}
      {showDPad && (
        <div className="flex flex-col items-center gap-1.5">
          {!showHorizontalOnly && (
            <button
              {...touchHandler(onUp)}
              className={`w-12 h-12 sm:w-16 sm:h-16 ${btnBase}`}
              aria-label="Up"
            >
              <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7 text-[#245E67]" />
            </button>
          )}

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              {...touchHandler(onLeft)}
              className={`w-12 h-12 sm:w-16 sm:h-16 ${btnBase}`}
              aria-label="Left"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-[#245E67]" />
            </button>

            <button
              {...touchHandler(onRight)}
              className={`w-12 h-12 sm:w-16 sm:h-16 ${btnBase}`}
              aria-label="Right"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#245E67]" />
            </button>
          </div>

          {!showHorizontalOnly && (
            <button
              {...touchHandler(onDown)}
              className={`w-12 h-12 sm:w-16 sm:h-16 ${btnBase}`}
              aria-label="Down"
            >
              <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 text-[#245E67]" />
            </button>
          )}
        </div>
      )}

      {/* Action Button */}
      {onAction && (
        <div className="flex items-center justify-end flex-1">
          <button
            {...touchHandler(onAction)}
            className="px-5 py-4 sm:px-6 sm:py-5 rounded-2xl bg-[#F5D66B] active:bg-[#FBE585] text-[#245E67] font-black text-sm sm:text-base flex items-center gap-2 border-[3px] border-[#245E67] shadow-[4px_4px_0px_#905080] active:translate-y-1 active:shadow-none select-none transition-all"
            aria-label={actionLabel}
          >
            <Zap className="w-5 h-5 fill-current text-[#245E67]" />
            <span>{actionLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileControls;
