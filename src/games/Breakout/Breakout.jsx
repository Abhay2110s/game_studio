import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, RotateCcw, Zap } from 'lucide-react';
import GameHeader from '../../components/GameHeader';
import GameOverModal from '../../components/GameOverModal';
import PauseModal from '../../components/PauseModal';
import MobileControls from '../../components/MobileControls';
import Button from '../../components/Button';
import { useSound } from '../../context/SoundContext';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const INITIAL_PADDLE_WIDTH = 110;
const PADDLE_HEIGHT = 14;

export const Breakout = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const { playBounce, playHit, playPowerup, playGameOver, playVictory, playClick } = useSound();

  const [gameState, setGameState] = useState('IDLE'); // IDLE, RUNNING, PAUSED, GAMEOVER, VICTORY
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);

  // Mutable Game Engine State (Refs for high FPS canvas loop)
  const engineRef = useRef({
    paddle: {
      x: (CANVAS_WIDTH - INITIAL_PADDLE_WIDTH) / 2,
      y: CANVAS_HEIGHT - 30,
      width: INITIAL_PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
      dx: 0,
      speed: 8,
    },
    balls: [
      {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - 45,
        dx: 4,
        dy: -4,
        radius: 7,
      },
    ],
    bricks: [],
    powerups: [],
    keys: { left: false, right: false },
    mouseControlled: true,
  });

  // Generate Brick Grid layout based on current Level
  const generateBricks = useCallback((currentLevel) => {
    const rows = 4 + Math.min(currentLevel, 3);
    const cols = 8;
    const brickWidth = 85;
    const brickHeight = 20;
    const brickPadding = 10;
    const offsetTop = 50;
    const offsetLeft = 20;

    const newBricks = [];
    const colors = ['#F43F5E', '#A855F7', '#22D3EE', '#22C55E', '#F59E0B'];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * (brickWidth + brickPadding) + offsetLeft;
        const y = r * (brickHeight + brickPadding) + offsetTop;

        // Brick Types: 0 = Normal (1 hit), 1 = Strong (2 hits), 2 = Bonus (1 hit + powerup drop)
        const rand = Math.random();
        let type = 0;
        let hits = 1;

        if (rand < 0.25) {
          type = 1; // Strong
          hits = 2;
        } else if (rand < 0.45) {
          type = 2; // Bonus Power-up
          hits = 1;
        }

        newBricks.push({
          x,
          y,
          width: brickWidth,
          height: brickHeight,
          type,
          hits,
          maxHits: hits,
          color: colors[r % colors.length],
        });
      }
    }
    return newBricks;
  }, []);

  const initGame = useCallback((nextLevel = 1, keepScore = false) => {
    playClick();
    const currentHighScore = highScore;
    
    if (!keepScore) {
      setScore(0);
      setLives(3);
      setLevel(1);
    } else {
      setLevel(nextLevel);
    }

    engineRef.current.paddle = {
      x: (CANVAS_WIDTH - INITIAL_PADDLE_WIDTH) / 2,
      y: CANVAS_HEIGHT - 30,
      width: INITIAL_PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
      dx: 0,
      speed: 8,
    };

    engineRef.current.balls = [
      {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - 45,
        dx: 4 * (Math.random() > 0.5 ? 1 : -1),
        dy: -4,
        radius: 7,
      },
    ];

    engineRef.current.bricks = generateBricks(nextLevel);
    engineRef.current.powerups = [];
    setGameState('RUNNING');
  }, [generateBricks, highScore, playClick]);

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        engineRef.current.keys.left = true;
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        engineRef.current.keys.right = true;
      } else if (['Space', 'KeyP'].includes(e.code)) {
        if (gameState === 'RUNNING' || gameState === 'PAUSED') {
          setGameState((s) => (s === 'RUNNING' ? 'PAUSED' : 'RUNNING'));
        }
      }
    };

    const handleKeyUp = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        engineRef.current.keys.left = false;
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        engineRef.current.keys.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Mouse Movement Handler for Paddle
  const handleMouseMove = (e) => {
    if (gameState !== 'RUNNING' || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const scaleX = CANVAS_WIDTH / rect.width;
    const paddle = engineRef.current.paddle;
    const scaledX = relativeX * scaleX;
    if (scaledX > 0 && scaledX < CANVAS_WIDTH) {
      paddle.x = Math.max(0, Math.min(CANVAS_WIDTH - paddle.width, scaledX - paddle.width / 2));
    }
  };

  // Touch Movement Handler for Paddle (mobile)
  const handleTouchMove = (e) => {
    if (gameState !== 'RUNNING' || !canvasRef.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const relativeX = touch.clientX - rect.left;
    const scaleX = CANVAS_WIDTH / rect.width;
    const paddle = engineRef.current.paddle;
    const scaledX = relativeX * scaleX;
    if (scaledX > 0 && scaledX < CANVAS_WIDTH) {
      paddle.x = Math.max(0, Math.min(CANVAS_WIDTH - paddle.width, scaledX - paddle.width / 2));
    }
  };

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    if (gameState !== 'RUNNING') return;

    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const { paddle, balls, bricks, powerups, keys } = engineRef.current;

      // Update Paddle Position from Keys
      if (keys.left) {
        paddle.x = Math.max(0, paddle.x - paddle.speed);
      }
      if (keys.right) {
        paddle.x = Math.min(CANVAS_WIDTH - paddle.width, paddle.x + paddle.speed);
      }

      // Clear Canvas
      ctx.fillStyle = '#0D1117';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw Grid Background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < CANVAS_WIDTH; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
      }

      // Update & Draw Bricks
      let activeBricksCount = 0;
      bricks.forEach((b) => {
        if (b.hits > 0) {
          activeBricksCount++;
          ctx.beginPath();
          ctx.roundRect(b.x, b.y, b.width, b.height, 4);

          if (b.type === 1) {
            // Strong Brick
            ctx.fillStyle = b.hits === 2 ? '#6366F1' : '#A5B4FC';
            ctx.strokeStyle = '#818CF8';
          } else if (b.type === 2) {
            // Bonus Brick
            ctx.fillStyle = '#F59E0B';
            ctx.strokeStyle = '#FCD34D';
          } else {
            // Normal Brick
            ctx.fillStyle = b.color;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          }

          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Level Clear Victory Check
      if (activeBricksCount === 0) {
        playVictory();
        initGame(level + 1, true);
        return;
      }

      // Update & Draw Power-ups
      for (let i = powerups.length - 1; i >= 0; i--) {
        const p = powerups[i];
        p.y += p.dy;

        // Draw Power-up Capsule
        ctx.beginPath();
        ctx.roundRect(p.x - 12, p.y - 8, 24, 16, 8);
        ctx.fillStyle = p.type === 'WIDE' ? '#22D3EE' : p.type === 'MULTI' ? '#A855F7' : '#22C55E';
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.type === 'WIDE' ? 'W' : p.type === 'MULTI' ? 'M' : 'S', p.x, p.y + 3);

        // Power-up Collision with Paddle
        if (
          p.y + 8 >= paddle.y &&
          p.y - 8 <= paddle.y + paddle.height &&
          p.x >= paddle.x &&
          p.x <= paddle.x + paddle.width
        ) {
          playPowerup();
          if (p.type === 'WIDE') {
            paddle.width = Math.min(220, paddle.width + 40);
          } else if (p.type === 'MULTI') {
            // Spawn extra ball
            if (balls.length > 0) {
              const mainBall = balls[0];
              balls.push({
                x: mainBall.x,
                y: mainBall.y,
                dx: -mainBall.dx,
                dy: mainBall.dy,
                radius: 7,
              });
            }
          } else if (p.type === 'SLOW') {
            balls.forEach((ball) => {
              ball.dx *= 0.75;
              ball.dy *= 0.75;
            });
          }
          powerups.splice(i, 1);
        } else if (p.y > CANVAS_HEIGHT) {
          powerups.splice(i, 1);
        }
      }

      // Update & Draw Balls
      for (let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];

        ball.x += ball.dx;
        ball.y += ball.dy;

        // Wall Collision (Left / Right)
        if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= CANVAS_WIDTH) {
          ball.dx = -ball.dx;
          playBounce();
        }

        // Wall Collision (Top)
        if (ball.y - ball.radius <= 0) {
          ball.dy = -ball.dy;
          playBounce();
        }

        // Paddle Collision
        if (
          ball.y + ball.radius >= paddle.y &&
          ball.y - ball.radius <= paddle.y + paddle.height &&
          ball.x >= paddle.x &&
          ball.x <= paddle.x + paddle.width &&
          ball.dy > 0
        ) {
          playBounce();
          ball.dy = -Math.abs(ball.dy);
          // Angle modifier depending on where ball hits paddle
          const hitPoint = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
          ball.dx = hitPoint * 6;
        }

        // Brick Collisions
        bricks.forEach((b) => {
          if (b.hits > 0) {
            if (
              ball.x + ball.radius >= b.x &&
              ball.x - ball.radius <= b.x + b.width &&
              ball.y + ball.radius >= b.y &&
              ball.y - ball.radius <= b.y + b.height
            ) {
              ball.dy = -ball.dy;
              b.hits--;
              playHit();

              if (b.hits === 0) {
                const pts = b.type === 1 ? 25 : b.type === 2 ? 20 : 10;
                setScore((s) => {
                  const nextScore = s + pts;
                  setHighScore((prev) => Math.max(prev, nextScore));
                  return nextScore;
                });

                // Drop power-up if bonus brick
                if (b.type === 2) {
                  const types = ['WIDE', 'MULTI', 'SLOW'];
                  const selectedType = types[Math.floor(Math.random() * types.length)];
                  powerups.push({
                    x: b.x + b.width / 2,
                    y: b.y + b.height / 2,
                    dy: 2,
                    type: selectedType,
                  });
                }
              }
            }
          }
        });

        // Ball Lost Bottom
        if (ball.y - ball.radius > CANVAS_HEIGHT) {
          balls.splice(i, 1);
        } else {
          // Draw Ball
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#22D3EE';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // If all balls lost
      if (balls.length === 0) {
        setLives((l) => {
          const nextLives = l - 1;
          if (nextLives <= 0) {
            setGameState('GAMEOVER');
          } else {
            // Respawn single ball
            balls.push({
              x: paddle.x + paddle.width / 2,
              y: CANVAS_HEIGHT - 45,
              dx: 4 * (Math.random() > 0.5 ? 1 : -1),
              dy: -4,
              radius: 7,
            });
          }
          return nextLives;
        });
      }

      // Draw Paddle
      ctx.beginPath();
      ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 6);
      const paddleGradient = ctx.createLinearGradient(paddle.x, 0, paddle.x + paddle.width, 0);
      paddleGradient.addColorStop(0, '#8B5CF6');
      paddleGradient.addColorStop(1, '#22D3EE');
      ctx.fillStyle = paddleGradient;
      ctx.shadowColor = '#8B5CF6';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, level, initGame, playBounce, playHit, playPowerup, playVictory]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <GameHeader
        title="Neon Breakout"
        score={score}
        highScore={highScore}
        extraStat={{ label: 'Lives', value: '❤️ '.repeat(lives) }}
        onPause={() => setGameState((s) => (s === 'RUNNING' ? 'PAUSED' : 'RUNNING'))}
        onRestart={() => initGame(1, false)}
        isPaused={gameState === 'PAUSED'}
      />

      <div className="flex flex-col items-center">
        {/* Canvas Screen */}
        <div className="relative w-full max-w-[800px] aspect-[8/5] bg-[#0D1117] rounded-xl sm:rounded-2xl border-2 border-purple-500/30 shadow-2xl overflow-hidden game-canvas-wrapper">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="w-full h-full cursor-none"
          />

          {/* Start Screen Overlay */}
          {gameState === 'IDLE' && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
              <div className="w-16 h-16 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-pink-400" />
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white mb-2">NEON BREAKOUT</h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6 max-w-sm px-2">
                Bounce the ball to destroy all bricks. Catch falling power-up capsules to widen your paddle & spawn multi-balls!
              </p>
              <Button onClick={() => initGame(1, false)} variant="primary" size="lg" icon={Play}>
                Start Game
              </Button>
            </div>
          )}
        </div>

        {/* Mobile On-Screen D-Pad */}
        <div className="w-full max-w-[800px] md:hidden">
          <MobileControls
            onLeft={() => { engineRef.current.paddle.x = Math.max(0, engineRef.current.paddle.x - 30); }}
            onRight={() => { engineRef.current.paddle.x = Math.min(CANVAS_WIDTH - engineRef.current.paddle.width, engineRef.current.paddle.x + 30); }}
            showDPad={true}
            showHorizontalOnly={true}
          />
        </div>
      </div>

      {/* Modals */}
      <PauseModal
        isOpen={gameState === 'PAUSED'}
        onResume={() => setGameState('RUNNING')}
        onRestart={() => initGame(1, false)}
        onBack={() => navigate('/games')}
      />

      <GameOverModal
        isOpen={gameState === 'GAMEOVER'}
        isVictory={false}
        score={score}
        highScore={highScore}
        stats={[{ label: 'Level Reached', value: level }]}
        onRestart={() => initGame(1, false)}
        onBack={() => navigate('/games')}
      />
    </div>
  );
};

export default Breakout;
