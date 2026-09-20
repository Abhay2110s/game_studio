import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Gamepad2, Flame, Zap, Trophy, Crown, Star, Ghost, Rocket,
  RotateCcw, Timer as TimerIcon, Hash, Sparkles
} from 'lucide-react';
import GameHeader from '../../components/GameHeader';
import GameOverModal from '../../components/GameOverModal';
import Button from '../../components/Button';

// Available Lucide Icons for memory cards
const ICON_LIST = [
  { id: 'gamepad', icon: Gamepad2, color: 'text-purple-400' },
  { id: 'flame', icon: Flame, color: 'text-orange-400' },
  { id: 'zap', icon: Zap, color: 'text-yellow-400' },
  { id: 'trophy', icon: Trophy, color: 'text-amber-400' },
  { id: 'crown', icon: Crown, color: 'text-cyan-400' },
  { id: 'star', icon: Star, color: 'text-emerald-400' },
  { id: 'ghost', icon: Ghost, color: 'text-pink-400' },
  { id: 'rocket', icon: Rocket, color: 'text-blue-400' },
];

const DIFFICULTY_CONFIG = {
  EASY: { count: 8, cols: 'grid-cols-4', label: 'Easy (8)' },
  MEDIUM: { count: 12, cols: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6', label: 'Medium (12)' },
  HARD: { count: 16, cols: 'grid-cols-4 md:grid-cols-8', label: 'Hard (16)' },
};

export const MemoryMatch = () => {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isWon, setIsWon] = useState(false);

  // Initialize and shuffle deck based on difficulty
  const initGame = useCallback((diffKey = difficulty) => {
    const config = DIFFICULTY_CONFIG[diffKey];
    const pairCount = config.count / 2;
    const selectedIcons = ICON_LIST.slice(0, pairCount);

    const deck = [...selectedIcons, ...selectedIcons].map((item, index) => ({
      uniqueId: `${item.id}-${index}`,
      iconId: item.id,
      Icon: item.icon,
      color: item.color,
    }));

    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setMatchedIds([]);
    setMoves(0);
    setSeconds(0);
    setIsEvaluating(false);
    setIsGameActive(true);
    setIsWon(false);
  }, [difficulty, playClick]);

  useEffect(() => {
    initGame(difficulty);
  }, [difficulty]);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (isGameActive && !isWon) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, isWon]);

  // Handle Card Flip
  const handleCardClick = (index) => {
    if (
      isEvaluating ||
      flippedIndices.includes(index) ||
      matchedIds.includes(cards[index].iconId) ||
      isWon
    ) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsEvaluating(true);

      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.iconId === secondCard.iconId) {
        // Match found!
        setMatchedIds((prev) => {
          const nextMatched = [...prev, firstCard.iconId];
          // Check win condition
          if (nextMatched.length === DIFFICULTY_CONFIG[difficulty].count / 2) {
            setIsWon(true);
            setIsGameActive(false);
          }
          return nextMatched;
        });
        setFlippedIndices([]);
        setIsEvaluating(false);
      } else {
        // No match - reset flipped after delay
        setTimeout(() => {
          setFlippedIndices([]);
          setIsEvaluating(false);
        }, 900);
      }
    }
  };

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <GameHeader
        title="Memory Match"
        score={moves}
        extraStat={{ label: 'Time', value: formatTime(seconds) }}
        onRestart={() => initGame(difficulty)}
      />

      {/* Difficulty Selector */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 gap-2">
          {Object.keys(DIFFICULTY_CONFIG).map((diffKey) => (
            <button
              key={diffKey}
              onClick={() => {
                setDifficulty(diffKey);
                initGame(diffKey);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                difficulty === diffKey
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {DIFFICULTY_CONFIG[diffKey].label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex justify-center items-center gap-8 mb-6">
        <div className="flex items-center gap-6 glass-panel px-6 py-2.5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-cyan-400">
            <Hash className="w-4 h-4" />
            <span className="text-xs font-semibold text-slate-300">Moves:</span>
            <span className="text-lg font-black text-white">{moves}</span>
          </div>

          <div className="w-px h-6 bg-slate-800" />

          <div className="flex items-center gap-2 text-purple-400">
            <TimerIcon className="w-4 h-4" />
            <span className="text-xs font-semibold text-slate-300">Time:</span>
            <span className="text-lg font-black text-white">{formatTime(seconds)}</span>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="flex justify-center">
        <div className={`grid ${DIFFICULTY_CONFIG[difficulty].cols} gap-2 sm:gap-3 md:gap-4 w-full max-w-2xl`}>
          {cards.map((card, idx) => {
            const isFlipped = flippedIndices.includes(idx) || matchedIds.includes(card.iconId);
            const isMatched = matchedIds.includes(card.iconId);

            return (
              <motion.div
                key={card.uniqueId}
                whileHover={{ scale: isFlipped ? 1 : 1.05 }}
                whileTap={{ scale: isFlipped ? 1 : 0.95 }}
                onClick={() => handleCardClick(idx)}
                className="aspect-[3/4] cursor-pointer perspective-1000"
              >
                <div
                  className={`w-full h-full rounded-2xl border transition-all duration-300 transform flex items-center justify-center shadow-xl ${
                    isMatched
                      ? 'bg-emerald-950/80 border-emerald-500/60 shadow-emerald-900/30'
                      : isFlipped
                      ? 'bg-slate-900 border-purple-500/60 shadow-purple-900/40'
                      : 'bg-gradient-to-tr from-slate-900 to-slate-800 border-white/10 hover:border-purple-400/40'
                  }`}
                >
                  {isFlipped ? (
                    <motion.div
                      initial={{ scale: 0, rotateY: 90 }}
                      animate={{ scale: 1, rotateY: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <card.Icon className={`w-10 h-10 ${card.color}`} />
                    </motion.div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-purple-400 opacity-60" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Victory Modal */}
      <GameOverModal
        isOpen={isWon}
        isVictory={true}
        customMessage="Fantastic memory skills! You matched all pairs perfectly."
        stats={[
          { label: 'Total Moves', value: moves },
          { label: 'Time Elapsed', value: formatTime(seconds) },
          { label: 'Difficulty', value: difficulty },
        ]}
        onRestart={() => initGame(difficulty)}
        onBack={() => navigate('/games')}
      />
    </div>
  );
};

export default MemoryMatch;
