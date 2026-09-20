import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, RotateCcw, Cpu, Users } from 'lucide-react';
import GameHeader from '../../components/GameHeader';
import GameOverModal from '../../components/GameOverModal';
import PauseModal from '../../components/PauseModal';
import MobileControls from '../../components/MobileControls';
import Button from '../../components/Button';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 90;
const WINNING_SCORE = 7;

export const Pong = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [gameState, setGameState] = useState('IDLE'); // IDLE, RUNNING, PAUSED, GAMEOVER
  const [mode, setMode] = useState('PVE'); // PVE or PVP
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [winnerMessage, setWinnerMessage] = useState('');

  const engineRef = useRef({
    p1: { x: 20, y: (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2, vy: 0, speed: 7 },
    p2: { x: CANVAS_WIDTH - 20 - PADDLE_WIDTH, y: (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2, vy: 0, speed: 7 },
    ball: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      vx: 5,
      vy: 3,
      radius: 8,
      speedMultiplier: 1.0,
    },
    keys: { w: false, s: false, up: false, down: false },
  });

  const resetBall = (direction = 1) => {
    const engine = engineRef.current;
    engine.ball.x = CANVAS_WIDTH / 2;
    engine.ball.y = CANVAS_HEIGHT / 2;
    engine.ball.speedMultiplier = 1.0;
    engine.ball.vx = 5 * direction;
    engine.ball.vy = (Math.random() * 4 - 2) || 2;
  };

  const startGame = () => {
    setP1Score(0);
    setP2Score(0);
    setWinnerMessage('');
    engineRef.current.p1.y = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
    engineRef.current.p2.y = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
    resetBall();
    setGameState('RUNNING');
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      const keys = engineRef.current.keys;
      if (e.code === 'KeyW') keys.w = true;
      if (e.code === 'KeyS') keys.s = true;
      if (e.code === 'ArrowUp') keys.up = true;
      if (e.code === 'ArrowDown') keys.down = true;
      if (e.code === 'Space' || e.code === 'KeyP') {
        if (gameState === 'RUNNING' || gameState === 'PAUSED') {
          setGameState((s) => (s === 'RUNNING' ? 'PAUSED' : 'RUNNING'));
        }
      }
    };

    const handleKeyUp = (e) => {
      const keys = engineRef.current.keys;
      if (e.code === 'KeyW') keys.w = false;
      if (e.code === 'KeyS') keys.s = false;
      if (e.code === 'ArrowUp') keys.up = false;
      if (e.code === 'ArrowDown') keys.down = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Game Loop
  useEffect(() => {
    if (gameState !== 'RUNNING') return;

    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const { p1, p2, ball, keys } = engineRef.current;

      // Update P1 (Left Paddle)
      if (keys.w) p1.y = Math.max(0, p1.y - p1.speed);
      if (keys.s) p1.y = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, p1.y + p1.speed);

      // Update P2 (Right Paddle - AI or Human)
      if (mode === 'PVP') {
        if (keys.up) p2.y = Math.max(0, p2.y - p2.speed);
        if (keys.down) p2.y = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, p2.y + p2.speed);
      } else {
        // Computer AI tracking
        const targetY = ball.y - PADDLE_HEIGHT / 2;
        const diff = targetY - p2.y;
        p2.y += Math.sign(diff) * Math.min(Math.abs(diff), 5.5);
        p2.y = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, p2.y));
      }

      // Update Ball Position
      ball.x += ball.vx * ball.speedMultiplier;
      ball.y += ball.vy * ball.speedMultiplier;

      // Top / Bottom Wall Collision
      if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= CANVAS_HEIGHT) {
        ball.vy = -ball.vy;
      }

      // P1 Paddle Collision (Left)
      if (
        ball.x - ball.radius <= p1.x + PADDLE_WIDTH &&
        ball.x + ball.radius >= p1.x &&
        ball.y >= p1.y &&
        ball.y <= p1.y + PADDLE_HEIGHT &&
        ball.vx < 0
      ) {
        ball.vx = Math.abs(ball.vx);
        const hitOffset = (ball.y - (p1.y + PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2);
        ball.vy = hitOffset * 6;
        ball.speedMultiplier = Math.min(2.2, ball.speedMultiplier + 0.06);
      }

      // P2 Paddle Collision (Right)
      if (
        ball.x + ball.radius >= p2.x &&
        ball.x - ball.radius <= p2.x + PADDLE_WIDTH &&
        ball.y >= p2.y &&
        ball.y <= p2.y + PADDLE_HEIGHT &&
        ball.vx > 0
      ) {
        ball.vx = -Math.abs(ball.vx);
        const hitOffset = (ball.y - (p2.y + PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2);
        ball.vy = hitOffset * 6;
        ball.speedMultiplier = Math.min(2.2, ball.speedMultiplier + 0.06);
      }

      // Point Scored P1 (Ball passed P2)
      if (ball.x + ball.radius >= CANVAS_WIDTH) {
        setP1Score((s) => {
          const next = s + 1;
          if (next >= WINNING_SCORE) {
            setWinnerMessage('Player 1 Wins!');
            setGameState('GAMEOVER');
          } else {
            resetBall(-1);
          }
          return next;
        });
      }

      // Point Scored P2 (Ball passed P1)
      if (ball.x - ball.radius <= 0) {
        setP2Score((s) => {
          const next = s + 1;
          if (next >= WINNING_SCORE) {
            setWinnerMessage(mode === 'PVE' ? 'Computer Wins!' : 'Player 2 Wins!');
            setGameState('GAMEOVER');
          } else {
            resetBall(1);
          }
          return next;
        });
      }

      // Clear Canvas
      ctx.fillStyle = '#0D1117';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw Center Net Line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 4;
      ctx.setLineDash([12, 12]);
      ctx.beginPath();
      ctx.moveTo(CANVAS_WIDTH / 2, 0);
      ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Paddles
      ctx.fillStyle = '#F59E0B';
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 10;
      ctx.fillRect(p1.x, p1.y, PADDLE_WIDTH, PADDLE_HEIGHT);

      ctx.fillStyle = '#22D3EE';
      ctx.shadowColor = '#22D3EE';
      ctx.fillRect(p2.x, p2.y, PADDLE_WIDTH, PADDLE_HEIGHT);
      ctx.shadowBlur = 0;

      // Draw Ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, mode]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <GameHeader
        title="Retro Pong"
        score={`${p1Score} - ${p2Score}`}
        onPause={() => setGameState((s) => (s === 'RUNNING' ? 'PAUSED' : 'RUNNING'))}
        onRestart={startGame}
        isPaused={gameState === 'PAUSED'}
      />

      {/* Mode Selector */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => { setMode('PVE'); setGameState('IDLE'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'PVE' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" /> VS Computer
          </button>
          <button
            onClick={() => { setMode('PVP'); setGameState('IDLE'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'PVP' ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> 2 Players (Local)
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {/* Canvas Area */}
        <div className="relative w-full max-w-[800px] aspect-[8/5] bg-[#0D1117] rounded-xl sm:rounded-2xl border-2 border-amber-500/30 shadow-2xl overflow-hidden game-canvas-wrapper">
          <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="w-full h-full" />

          {/* Start Screen Overlay */}
          {gameState === 'IDLE' && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
              <h2 className="text-xl sm:text-3xl font-black text-white mb-2">PONG ARCADE</h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6 max-w-sm px-2">
                First player to reach <strong>7 points</strong> wins the match!
                <br />
                <span className="text-xs text-amber-400 font-semibold mt-1 inline-block">
                  P1 Controls: W / S | P2 Controls: Up / Down Arrows
                </span>
              </p>
              <Button onClick={startGame} variant="cyan" size="lg" icon={Play}>
                Start Match
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="w-full max-w-[800px] md:hidden">
          <MobileControls
            showVerticalOnly={true}
            onUpStart={() => { engineRef.current.keys.w = true; }}
            onUpEnd={() => { engineRef.current.keys.w = false; }}
            onDownStart={() => { engineRef.current.keys.s = true; }}
            onDownEnd={() => { engineRef.current.keys.s = false; }}
          />
        </div>
      </div>

      {/* Modals */}
      <PauseModal
        isOpen={gameState === 'PAUSED'}
        onResume={() => setGameState('RUNNING')}
        onRestart={startGame}
        onBack={() => navigate('/games')}
      />

      <GameOverModal
        isOpen={gameState === 'GAMEOVER'}
        isVictory={winnerMessage.includes('Player 1')}
        customMessage={winnerMessage}
        stats={[{ label: 'Final Score', value: `${p1Score} - ${p2Score}` }]}
        onRestart={startGame}
        onBack={() => navigate('/games')}
      />
    </div>
  );
};

export default Pong;
