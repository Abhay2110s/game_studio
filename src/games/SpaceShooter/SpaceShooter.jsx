import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, RotateCcw, Rocket, Zap, Shield as ShieldIcon } from 'lucide-react';
import GameHeader from '../../components/GameHeader';
import GameOverModal from '../../components/GameOverModal';
import PauseModal from '../../components/PauseModal';
import MobileControls from '../../components/MobileControls';
import Button from '../../components/Button';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 550;

export const SpaceShooter = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [gameState, setGameState] = useState('IDLE'); // IDLE, RUNNING, PAUSED, GAMEOVER, VICTORY
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);
  const [bossHp, setBossHp] = useState(null);

  // Mutable Game State
  const engineRef = useRef({
    player: {
      x: CANVAS_WIDTH / 2 - 20,
      y: CANVAS_HEIGHT - 60,
      width: 40,
      height: 40,
      speed: 7,
      shield: false,
      multiShotTimer: 0,
      rapidTimer: 0,
      lastShotTime: 0,
    },
    bullets: [],
    enemyBullets: [],
    enemies: [],
    boss: null,
    particles: [],
    powerups: [],
    keys: { left: false, right: false, shoot: false },
  });

  // Spawn Enemy Wave
  const spawnWave = useCallback((currentWave) => {
    const engine = engineRef.current;
    engine.enemies = [];
    engine.boss = null;
    setBossHp(null);

    // Wave 4+ spawns BOSS!
    if (currentWave % 4 === 0) {
      engine.boss = {
        x: CANVAS_WIDTH / 2 - 60,
        y: 50,
        width: 120,
        height: 70,
        hp: 40 + currentWave * 10,
        maxHp: 40 + currentWave * 10,
        vx: 3,
        lastShot: 0,
      };
      setBossHp(engine.boss.hp);
      return;
    }

    const count = 6 + currentWave * 3;
    const rows = Math.min(4, Math.ceil(count / 7));
    const cols = Math.min(7, count);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * 90 + 70;
        const y = r * 50 + 40;

        const rand = Math.random();
        let type = 'BASIC'; // BASIC, FAST, STRONG
        let hp = 1;
        let speed = 1.2 + currentWave * 0.2;

        if (rand < 0.2) {
          type = 'STRONG';
          hp = 3;
          speed = 0.8;
        } else if (rand < 0.45) {
          type = 'FAST';
          hp = 1;
          speed = 2.4;
        }

        engine.enemies.push({
          x,
          y,
          width: 36,
          height: 30,
          type,
          hp,
          speed,
          vx: Math.random() > 0.5 ? 1 : -1,
        });
      }
    }
  }, []);

  const initGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setWave(1);

    const player = engineRef.current.player;
    player.x = CANVAS_WIDTH / 2 - 20;
    player.y = CANVAS_HEIGHT - 60;
    player.shield = false;
    player.multiShotTimer = 0;
    player.rapidTimer = 0;

    engineRef.current.bullets = [];
    engineRef.current.enemyBullets = [];
    engineRef.current.particles = [];
    engineRef.current.powerups = [];

    spawnWave(1);
    setGameState('RUNNING');
  }, [spawnWave]);

  // Create Explosive Canvas Particle Effects
  const createExplosion = (x, y, color = '#F59E0B') => {
    const { particles } = engineRef.current;
    for (let i = 0; i < 16; i++) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        radius: Math.random() * 3 + 1,
        color,
        life: 25,
      });
    }
  };

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      const keys = engineRef.current.keys;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) keys.left = true;
      if (['ArrowRight', 'KeyD'].includes(e.code)) keys.right = true;
      if (['KeyQ'].includes(e.code) || e.key === 'q' || e.key === 'Q') keys.shoot = true;
      if (['KeyP'].includes(e.code)) {
        if (gameState === 'RUNNING' || gameState === 'PAUSED') {
          setGameState((s) => (s === 'RUNNING' ? 'PAUSED' : 'RUNNING'));
        }
      }
    };

    const handleKeyUp = (e) => {
      const keys = engineRef.current.keys;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) keys.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) keys.right = false;
      if (['KeyQ'].includes(e.code) || e.key === 'q' || e.key === 'Q') keys.shoot = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Shoot Action Handler
  const firePlayerLaser = useCallback(() => {
    const { player, bullets } = engineRef.current;
    const now = Date.now();
    const cooldown = player.rapidTimer > 0 ? 120 : 250;

    if (now - player.lastShotTime > cooldown) {
      player.lastShotTime = now;

      if (player.multiShotTimer > 0) {
        // Triple Spread Shot
        bullets.push({ x: player.x + 18, y: player.y, vx: 0, vy: -10 });
        bullets.push({ x: player.x + 10, y: player.y, vx: -3, vy: -9 });
        bullets.push({ x: player.x + 26, y: player.y, vx: 3, vy: -9 });
      } else {
        // Single Laser
        bullets.push({ x: player.x + 18, y: player.y, vx: 0, vy: -10 });
      }
    }
  }, []);

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    if (gameState !== 'RUNNING') return;

    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const { player, bullets, enemyBullets, enemies, boss, particles, powerups, keys } = engineRef.current;

      // Update Player Position
      if (keys.left) player.x = Math.max(10, player.x - player.speed);
      if (keys.right) player.x = Math.min(CANVAS_WIDTH - player.width - 10, player.x + player.speed);
      if (keys.shoot) firePlayerLaser();

      // Powerup Timers Countdown
      if (player.multiShotTimer > 0) player.multiShotTimer--;
      if (player.rapidTimer > 0) player.rapidTimer--;

      // Clear Canvas
      ctx.fillStyle = '#08090D';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Starfield Background
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 35; i++) {
        const sx = (i * 37) % CANVAS_WIDTH;
        const sy = (i * 23 + Date.now() * 0.05) % CANVAS_HEIGHT;
        ctx.fillRect(sx, sy, i % 2 === 0 ? 1.5 : 1, i % 2 === 0 ? 1.5 : 1);
      }

      // Draw Player Ship
      ctx.save();
      ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(18, 15);
      ctx.lineTo(8, 10);
      ctx.lineTo(0, 18);
      ctx.lineTo(-8, 10);
      ctx.lineTo(-18, 15);
      ctx.closePath();
      ctx.fillStyle = '#8B5CF6';
      ctx.shadowColor = '#8B5CF6';
      ctx.shadowBlur = 12;
      ctx.fill();

      // Shield Aura
      if (player.shield) {
        ctx.beginPath();
        ctx.arc(0, 0, 26, 0, Math.PI * 2);
        ctx.strokeStyle = '#22D3EE';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      ctx.restore();

      // Update & Draw Player Bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.x += b.vx;
        b.y += b.vy;

        ctx.fillStyle = '#22D3EE';
        ctx.shadowColor = '#22D3EE';
        ctx.shadowBlur = 8;
        ctx.fillRect(b.x - 2, b.y, 4, 12);
        ctx.shadowBlur = 0;

        if (b.y < -10) bullets.splice(i, 1);
      }

      // Update & Draw Enemy Bullets
      for (let i = enemyBullets.length - 1; i >= 0; i--) {
        const eb = enemyBullets[i];
        eb.x += eb.vx;
        eb.y += eb.vy;

        ctx.fillStyle = '#EF4444';
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = 8;
        ctx.fillRect(eb.x - 2.5, eb.y, 5, 10);
        ctx.shadowBlur = 0;

        // Player Hit Check
        if (
          eb.x >= player.x &&
          eb.x <= player.x + player.width &&
          eb.y >= player.y &&
          eb.y <= player.y + player.height
        ) {
          enemyBullets.splice(i, 1);
          if (player.shield) {
            player.shield = false;
          } else {
            createExplosion(player.x + 20, player.y + 20, '#EF4444');
            setLives((l) => {
              const next = l - 1;
              if (next <= 0) setGameState('GAMEOVER');
              return next;
            });
          }
        } else if (eb.y > CANVAS_HEIGHT) {
          enemyBullets.splice(i, 1);
        }
      }

      // Update & Draw Boss Ship (If Active)
      if (boss) {
        boss.x += boss.vx;
        if (boss.x < 20 || boss.x + boss.width > CANVAS_WIDTH - 20) boss.vx = -boss.vx;

        // Boss Shoot
        if (Math.random() < 0.04) {
          enemyBullets.push({ x: boss.x + boss.width / 2 - 20, y: boss.y + boss.height, vx: -2, vy: 5 });
          enemyBullets.push({ x: boss.x + boss.width / 2, y: boss.y + boss.height, vx: 0, vy: 5 });
          enemyBullets.push({ x: boss.x + boss.width / 2 + 20, y: boss.y + boss.height, vx: 2, vy: 5 });
        }

        // Render Boss Body
        ctx.beginPath();
        ctx.roundRect(boss.x, boss.y, boss.width, boss.height, 12);
        ctx.fillStyle = '#DC2626';
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Boss Health Bar Header
        setBossHp(boss.hp);

        // Bullet Collisions with Boss
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          if (
            b.x >= boss.x &&
            b.x <= boss.x + boss.width &&
            b.y >= boss.y &&
            b.y <= boss.y + boss.height
          ) {
            bullets.splice(j, 1);
            boss.hp--;
            createExplosion(b.x, b.y, '#F59E0B');

            if (boss.hp <= 0) {
              createExplosion(boss.x + 60, boss.y + 35, '#F59E0B');
              setScore((s) => s + 500);
              engineRef.current.boss = null;
              setWave((w) => {
                const nextW = w + 1;
                spawnWave(nextW);
                return nextW;
              });
            }
          }
        }
      }

      // Update & Draw Regular Enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        e.x += e.vx * e.speed;
        if (e.x < 15 || e.x + e.width > CANVAS_WIDTH - 15) e.vx = -e.vx;

        // Random Enemy Shooting
        if (Math.random() < 0.003) {
          enemyBullets.push({ x: e.x + e.width / 2, y: e.y + e.height, vx: 0, vy: 4 });
        }

        // Draw Enemy Ship
        ctx.beginPath();
        ctx.roundRect(e.x, e.y, e.width, e.height, 6);
        ctx.fillStyle = e.type === 'STRONG' ? '#9333EA' : e.type === 'FAST' ? '#F59E0B' : '#EF4444';
        ctx.fill();

        // Bullet Collisions with Enemy
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          if (
            b.x >= e.x &&
            b.x <= e.x + e.width &&
            b.y >= e.y &&
            b.y <= e.y + e.height
          ) {
            bullets.splice(j, 1);
            e.hp--;
            if (e.hp <= 0) {
              createExplosion(e.x + e.width / 2, e.y + e.height / 2, e.type === 'STRONG' ? '#C084FC' : '#F87171');

              // Drop Powerup Chance
              if (Math.random() < 0.2) {
                const pTypes = ['SHIELD', 'MULTI', 'RAPID'];
                powerups.push({
                  x: e.x + e.width / 2,
                  y: e.y + e.height / 2,
                  vy: 2,
                  type: pTypes[Math.floor(Math.random() * pTypes.length)],
                });
              }

              const pts = e.type === 'STRONG' ? 30 : e.type === 'FAST' ? 20 : 10;
              setScore((s) => {
                const next = s + pts;
                setHighScore((prev) => Math.max(prev, next));
                return next;
              });

              enemies.splice(i, 1);
              break;
            }
          }
        }
      }

      // Check Wave Completion
      if (enemies.length === 0 && !boss) {
        setWave((w) => {
          const nextW = w + 1;
          spawnWave(nextW);
          return nextW;
        });
      }

      // Update & Draw Power-ups
      for (let i = powerups.length - 1; i >= 0; i--) {
        const p = powerups[i];
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = p.type === 'SHIELD' ? '#22D3EE' : p.type === 'MULTI' ? '#A855F7' : '#F59E0B';
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.type[0], p.x, p.y + 3);

        // Power-up Picked up
        if (
          p.x >= player.x &&
          p.x <= player.x + player.width &&
          p.y >= player.y &&
          p.y <= player.y + player.height
        ) {
          if (p.type === 'SHIELD') player.shield = true;
          if (p.type === 'MULTI') player.multiShotTimer = 300;
          if (p.type === 'RAPID') player.rapidTimer = 300;
          powerups.splice(i, 1);
        } else if (p.y > CANVAS_HEIGHT) {
          powerups.splice(i, 1);
        }
      }

      // Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life--;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.fill();

        if (pt.life <= 0) particles.splice(i, 1);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, spawnWave, firePlayerLaser]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <GameHeader
        title="Space Shooter"
        score={score}
        highScore={highScore}
        extraStat={{ label: 'Wave', value: wave }}
        onPause={() => setGameState((s) => (s === 'RUNNING' ? 'PAUSED' : 'RUNNING'))}
        onRestart={initGame}
        isPaused={gameState === 'PAUSED'}
      />

      <div className="flex flex-col items-center">
        {/* Boss HP Bar */}
        {bossHp !== null && (
          <div className="w-full max-w-[800px] bg-slate-900 border border-red-500/40 p-1.5 sm:p-2 rounded-lg sm:rounded-xl mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
            <span className="text-xs font-black text-red-400 uppercase tracking-widest">⚠️ BOSS HP</span>
            <div className="flex-1 bg-slate-950 h-3 rounded-full overflow-hidden border border-red-900">
              <div
                className="bg-gradient-to-r from-red-600 to-rose-400 h-full transition-all duration-150"
                style={{ width: `${Math.max(0, (bossHp / 50) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Canvas Area */}
        <div className="relative w-full max-w-[800px] aspect-[16/11] bg-[#08090D] rounded-xl sm:rounded-2xl border-2 border-purple-500/30 shadow-2xl overflow-hidden game-canvas-wrapper">
          <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="w-full h-full" />

          {/* Lives Indicator Bar overlay */}
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
            <span className="text-xs font-bold text-slate-300">Lives:</span>
            <span className="text-xs">{ '❤️ '.repeat(lives) }</span>
          </div>

          {/* Start Screen Overlay */}
          {gameState === 'IDLE' && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mb-4">
                <Rocket className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white mb-2">SPACE SHOOTER</h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6 max-w-sm px-2">
                Blast enemy armadas, collect shields, triple lasers & rapid fire powerups, and defeat the Mothership boss!
              </p>
              <Button onClick={initGame} variant="primary" size="lg" icon={Play}>
                Launch Mission
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="w-full max-w-[800px] md:hidden">
          <MobileControls
            onLeft={() => { engineRef.current.player.x = Math.max(10, engineRef.current.player.x - 30); }}
            onRight={() => { engineRef.current.player.x = Math.min(CANVAS_WIDTH - 50, engineRef.current.player.x + 30); }}
            onAction={firePlayerLaser}
            actionLabel="FIRE LASER"
            showDPad={true}
            showHorizontalOnly={true}
          />
        </div>
      </div>

      {/* Modals */}
      <PauseModal
        isOpen={gameState === 'PAUSED'}
        onResume={() => setGameState('RUNNING')}
        onRestart={initGame}
        onBack={() => navigate('/games')}
      />

      <GameOverModal
        isOpen={gameState === 'GAMEOVER'}
        isVictory={false}
        score={score}
        highScore={highScore}
        stats={[{ label: 'Waves Survived', value: wave }]}
        onRestart={initGame}
        onBack={() => navigate('/games')}
      />
    </div>
  );
};

export default SpaceShooter;
