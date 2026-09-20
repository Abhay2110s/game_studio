import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Circle, RotateCcw, Users, Cpu, Trophy, Bot } from 'lucide-react';
import GameHeader from '../../components/GameHeader';
import GameOverModal from '../../components/GameOverModal';
import Button from '../../components/Button';

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export const TicTacToe = () => {
  const navigate = useNavigate();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [mode, setMode] = useState('PVE'); // 'PVP' or 'PVE'
  const [difficulty, setDifficulty] = useState('HARD'); // 'EASY', 'MEDIUM', 'HARD'
  const [winner, setWinner] = useState(null); // 'X', 'O', 'DRAW', or null
  const [winningLine, setWinningLine] = useState(null);
  const [stats, setStats] = useState({ xWins: 0, oWins: 0, draws: 0 });

  // Minimax algorithm implementation for Hard Mode
  const minimax = (currentBoard, depth, isMaximizing) => {
    // Check terminal states
    const winResult = checkWinnerBoard(currentBoard);
    if (winResult?.winner === 'O') return 10 - depth;
    if (winResult?.winner === 'X') return depth - 10;
    if (currentBoard.every((cell) => cell !== null)) return 0;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'O';
          const evaluation = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          maxEval = Math.max(maxEval, evaluation);
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'X';
          const evaluation = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          minEval = Math.min(minEval, evaluation);
        }
      }
      return minEval;
    }
  };

  const getBestMove = (currentBoard, level) => {
    const emptyIndices = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndices.length === 0) return -1;

    // EASY: Pure Random
    if (level === 'EASY') {
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    // MEDIUM: Try to win or block X from winning, else random
    if (level === 'MEDIUM') {
      // 1. Can O win?
      for (let idx of emptyIndices) {
        currentBoard[idx] = 'O';
        if (checkWinnerBoard(currentBoard)?.winner === 'O') {
          currentBoard[idx] = null;
          return idx;
        }
        currentBoard[idx] = null;
      }
      // 2. Can X win next move? Block them!
      for (let idx of emptyIndices) {
        currentBoard[idx] = 'X';
        if (checkWinnerBoard(currentBoard)?.winner === 'X') {
          currentBoard[idx] = null;
          return idx;
        }
        currentBoard[idx] = null;
      }
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    // HARD: Unbeatable Minimax
    let bestScore = -Infinity;
    let bestMove = emptyIndices[0];

    for (let idx of emptyIndices) {
      currentBoard[idx] = 'O';
      const score = minimax(currentBoard, 0, false);
      currentBoard[idx] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = idx;
      }
    }
    return bestMove;
  };

  const checkWinnerBoard = (b) => {
    for (let combo of WINNING_COMBOS) {
      const [a, c, d] = combo;
      if (b[a] && b[a] === b[c] && b[a] === b[d]) {
        return { winner: b[a], combo };
      }
    }
    if (b.every((cell) => cell !== null)) {
      return { winner: 'DRAW', combo: null };
    }
    return null;
  };

  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    playBounce();

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const winData = checkWinnerBoard(newBoard);
    if (winData) {
      setWinner(winData.winner);
      setWinningLine(winData.combo);
      updateStats(winData.winner);
      return;
    }

    setIsXNext(!isXNext);
  };

  // Computer move effect for PvE
  useEffect(() => {
    if (mode === 'PVE' && !isXNext && !winner) {
      const timer = setTimeout(() => {
        const cpuMoveIndex = getBestMove([...board], difficulty);
        if (cpuMoveIndex !== -1) {
          playBounce();
          const newBoard = [...board];
          newBoard[cpuMoveIndex] = 'O';
          setBoard(newBoard);

          const winData = checkWinnerBoard(newBoard);
          if (winData) {
            setWinner(winData.winner);
            setWinningLine(winData.combo);
            updateStats(winData.winner);
          } else {
            setIsXNext(true);
          }
        }
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [board, isXNext, mode, difficulty, winner]);

  const updateStats = (resultWinner) => {
    if (resultWinner === 'X') {
      setStats((s) => ({ ...s, xWins: s.xWins + 1 }));
    } else if (resultWinner === 'O') {
      setStats((s) => ({ ...s, oWins: s.oWins + 1 }));
    } else if (resultWinner === 'DRAW') {
      setStats((s) => ({ ...s, draws: s.draws + 1 }));
    }
  };

  const resetGame = () => {
    playClick();
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <GameHeader
        title="Tic Tac Toe"
        onRestart={resetGame}
      />

      {/* Mode & Difficulty Selector */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => { setMode('PVE'); resetGame(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'PVE' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
          >
            <Cpu className="w-4 h-4" /> VS Computer
          </button>
          <button
            onClick={() => { setMode('PVP'); resetGame(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'PVP' ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
          >
            <Users className="w-4 h-4" /> 2 Players (Local)
          </button>
        </div>

        {mode === 'PVE' && (
          <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-white/10">
            {['EASY', 'MEDIUM', 'HARD'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => { setDifficulty(lvl); resetGame(); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${difficulty === lvl ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Turn Indicator & Scoreboard */}
      <div className="flex flex-wrap items-center justify-center gap-8 mb-6">
        <div className="flex items-center gap-6 glass-panel px-6 py-3 rounded-2xl border border-white/10">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1">
              <X className="w-3.5 h-3.5" /> Player X
            </span>
            <span className="text-xl font-black text-white">{stats.xWins}</span>
          </div>

          <div className="w-px h-8 bg-slate-800" />

          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Draws</span>
            <span className="text-xl font-black text-slate-300">{stats.draws}</span>
          </div>

          <div className="w-px h-8 bg-slate-800" />

          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1">
              <Circle className="w-3.5 h-3.5" /> {mode === 'PVE' ? `CPU (${difficulty})` : 'Player O'}
            </span>
            <span className="text-xl font-black text-white">{stats.oWins}</span>
          </div>
        </div>
      </div>

      {/* Current Turn Badge */}
      {!winner && (
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-slate-900 border border-purple-500/30 text-purple-300">
            {isXNext ? <X className="w-4 h-4 text-cyan-400" /> : <Circle className="w-4 h-4 text-purple-400" />}
            <span>Turn: {isXNext ? 'Player X' : mode === 'PVE' ? 'Computer Thinking...' : 'Player O'}</span>
          </span>
        </div>
      )}

      {/* 3x3 Game Board Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-2 sm:gap-3.5 w-full max-w-[280px] sm:max-w-[360px] aspect-square bg-[#0D1117] p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-purple-500/30 shadow-2xl relative">
          {board.map((cell, idx) => {
            const isWinningCell = winningLine && winningLine.includes(idx);
            return (
              <motion.button
                key={idx}
                whileHover={{ scale: cell || winner ? 1 : 1.05 }}
                whileTap={{ scale: cell || winner ? 1 : 0.95 }}
                onClick={() => handleCellClick(idx)}
                disabled={!!cell || !!winner || (mode === 'PVE' && !isXNext)}
                className={`w-full h-full rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer ${isWinningCell
                    ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/50 border-2 border-cyan-400'
                    : cell
                      ? 'bg-slate-900/90 border border-slate-700/60'
                      : 'bg-slate-900/50 hover:bg-slate-800/80 border border-white/5 hover:border-purple-500/40'
                  }`}
              >
                {cell === 'X' && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <X className="w-10 h-10 sm:w-14 sm:h-14 text-cyan-400 stroke-[3]" />
                  </motion.div>
                )}
                {cell === 'O' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Circle className="w-9 h-9 sm:w-12 sm:h-12 text-purple-400 stroke-[3]" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Victory / Draw Modal */}
      <GameOverModal
        isOpen={!!winner}
        isVictory={winner === 'X' || (mode === 'PVP' && winner === 'O')}
        customMessage={
          winner === 'DRAW'
            ? 'It is a draw!'
            : winner === 'X'
              ? 'Player X wins the match!'
              : mode === 'PVE'
                ? `Computer (${difficulty}) won this round!`
                : 'Player O wins the match!'
        }
        stats={[
          { label: 'Mode', value: mode === 'PVE' ? `VS CPU (${difficulty})` : '2-Player Local' },
        ]}
        onRestart={resetGame}
        onBack={() => navigate('/games')}
      />
    </div>
  );
};

export default TicTacToe;
