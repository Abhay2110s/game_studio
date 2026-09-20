import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, RotateCcw, Award, Zap } from 'lucide-react';
import GameHeader from '../../components/GameHeader';
import GameOverModal from '../../components/GameOverModal';
import PauseModal from '../../components/PauseModal';
import MobileControls from '../../components/MobileControls';
import Button from '../../components/Button';

const GRID_SIZE = 20;
const INITIAL_SPEED = 140;

export const Snake = () => {
  const navigate = useNavigate();

  const [gameState, setGameState] = useState('IDLE'); // IDLE, RUNNING, PAUSED, GAMEOVER
  const [snake, setSnake] = useState([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const [direction, setDirection] = useState('UP');
  const [food, setFood] = useState({ x: 5, y: 5, isBonus: false });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [foodEatenCount, setFoodEatenCount] = useState(0);

  const directionRef = useRef(direction);
  directionRef.current = direction;

  // Generate random food position not on snake
  const generateFood = useCallback((currentSnake) => {
    let newX, newY, isOnSnake;
    do {
      newX = Math.floor(Math.random() * GRID_SIZE);
      newY = Math.floor(Math.random() * GRID_SIZE);
      isOnSnake = currentSnake.some((seg) => seg.x === newX && seg.y === newY);
    } while (isOnSnake);

    const isBonus = Math.random() < 0.2; // 20% chance for bonus glowing food
    return { x: newX, y: newY, isBonus };
  }, []);

  const startGame = () => {
    const initialSnake = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    setSnake(initialSnake);
    setDirection('UP');
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setFoodEatenCount(0);
    setFood(generateFood(initialSnake));
    setGameState('RUNNING');
  };

  const handlePause = () => {
    if (gameState === 'RUNNING') {
      setGameState('PAUSED');
    } else if (gameState === 'PAUSED') {
      setGameState('RUNNING');
    }
  };

  const changeDirection = useCallback((newDir) => {
    const current = directionRef.current;
    if (newDir === 'UP' && current !== 'DOWN') setDirection('UP');
    if (newDir === 'DOWN' && current !== 'UP') setDirection('DOWN');
    if (newDir === 'LEFT' && current !== 'RIGHT') setDirection('LEFT');
    if (newDir === 'RIGHT' && current !== 'LEFT') setDirection('RIGHT');
  }, []);

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        changeDirection('UP');
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        changeDirection('DOWN');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        changeDirection('LEFT');
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        changeDirection('RIGHT');
      } else if (e.code === 'Space' || e.code === 'KeyP') {
        e.preventDefault();
        if (gameState === 'RUNNING' || gameState === 'PAUSED') {
          handlePause();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, changeDirection]);

  // Main Game Loop Timer
  useEffect(() => {
    if (gameState !== 'RUNNING') return;

    const timer = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };

        switch (directionRef.current) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
          default: break;
        }

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameState('GAMEOVER');
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some((seg) => seg.x === head.x && seg.y === head.y)) {
          setGameState('GAMEOVER');
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          const pts = food.isBonus ? 30 : 10;
          setScore((s) => {
            const nextScore = s + pts;
            setHighScore((prevHigh) => Math.max(prevHigh, nextScore));
            return nextScore;
          });

          // Speed scaling
          setSpeed((sp) => Math.max(70, sp - 3));
          setFoodEatenCount((c) => c + 1);

          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [gameState, speed, food, generateFood, playEat]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <GameHeader
        title="Snake Arcade"
        score={score}
        highScore={highScore}
        extraStat={{ label: 'Speed', value: `${Math.round((INITIAL_SPEED / speed) * 100)}%` }}
        onPause={handlePause}
        onRestart={startGame}
        isPaused={gameState === 'PAUSED'}
      />

      <div className="flex flex-col items-center">
        {/* Game Grid Screen */}
        <div className="relative w-full max-w-[500px] aspect-square bg-[#0D1117] rounded-xl sm:rounded-2xl border-2 border-purple-500/30 shadow-2xl p-1 sm:p-2 flex items-center justify-center overflow-hidden arcade-grid-bg game-canvas-wrapper">
          
          {/* Grid Render */}
          <div
            className="w-full h-full grid gap-[1px] bg-slate-950/60 rounded-xl overflow-hidden"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
              const x = idx % GRID_SIZE;
              const y = Math.floor(idx / GRID_SIZE);

              const isHead = snake[0].x === x && snake[0].y === y;
              const isBody = !isHead && snake.some((seg) => seg.x === x && seg.y === y);
              const isFoodItem = food.x === x && food.y === y;

              return (
                <div
                  key={idx}
                  className="w-full h-full rounded-[3px] transition-all duration-75 flex items-center justify-center"
                >
                  {isHead && (
                    <div className="w-full h-full bg-gradient-to-tr from-emerald-500 to-green-400 rounded-md shadow-lg shadow-emerald-500/50 scale-105 z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    </div>
                  )}
                  {isBody && (
                    <div className="w-[90%] h-[90%] bg-emerald-600 rounded-[4px] opacity-90 border border-emerald-400/40" />
                  )}
                  {isFoodItem && (
                    <div
                      className={`w-[85%] h-[85%] rounded-full animate-bounce ${
                        food.isBonus
                          ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-lg shadow-amber-400/80 border-2 border-white'
                          : 'bg-gradient-to-tr from-red-500 to-rose-400 shadow-md shadow-red-500/50'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* IDLE / START Overlay */}
          {gameState === 'IDLE' && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white mb-2">READY TO SLITHER?</h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6 max-w-xs">
                Eat apples to grow longer and boost your speed. Avoid running into walls or your tail!
              </p>
              <Button onClick={startGame} variant="primary" size="lg" icon={Play}>
                Start Playing
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="w-full max-w-[500px] md:hidden">
          <MobileControls
            onUp={() => changeDirection('UP')}
            onDown={() => changeDirection('DOWN')}
            onLeft={() => changeDirection('LEFT')}
            onRight={() => changeDirection('RIGHT')}
            showDPad={true}
          />
        </div>

        {/* Instructions & Controls Guide */}
        <div className="w-full max-w-[500px] mt-4 sm:mt-6 glass-panel rounded-xl p-3 sm:p-4 flex flex-wrap justify-between items-center text-[10px] sm:text-xs text-slate-400 gap-2 border border-white/5">
          <div><strong className="text-slate-200">Move:</strong> Arrow Keys or W/A/S/D</div>
          <div><strong className="text-slate-200">Pause:</strong> Spacebar or P</div>
          <div><strong className="text-slate-200">Bonus Fruit:</strong> Yellow (30 pts)</div>
        </div>
      </div>

      {/* Modals */}
      <PauseModal
        isOpen={gameState === 'PAUSED'}
        onResume={handlePause}
        onRestart={startGame}
        onBack={() => navigate('/games')}
      />

      <GameOverModal
        isOpen={gameState === 'GAMEOVER'}
        isVictory={false}
        score={score}
        highScore={highScore}
        customMessage={score === highScore && score > 0 ? '🔥 New Session High Score!' : undefined}
        onRestart={startGame}
        onBack={() => navigate('/games')}
      />
    </div>
  );
};

export default Snake;
