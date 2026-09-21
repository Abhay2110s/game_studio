export const GAMES_DATA = [
  {
    id: 'snake',
    slug: 'snake',
    title: 'Snake',
    description: 'Guide the growing pixel snake to eat apples, avoid walls, and outrun your own tail.',
    category: 'Arcade',
    difficulty: 'Medium',
    badgeColor: 'from-emerald-500 to-green-600',
    accentColor: '#22C55E',
    controls: ['Arrow Keys / WASD to turn', 'Space / P to pause', 'Touch D-Pad on Mobile'],
    tags: ['Grid', 'Classic', 'Reflexes']
  },
  {
    id: 'tictactoe',
    slug: 'tictactoe',
    title: 'Tic Tac Toe',
    description: 'Classic strategy battle! Challenge a friend locally or take on AI from Easy to Minimax Hard mode.',
    category: 'Puzzle',
    difficulty: 'Easy',
    badgeColor: 'from-cyan-500 to-blue-600',
    accentColor: '#22D3EE',
    controls: ['Click/Tap cell to make move', 'Select PvP or PvE AI mode', 'Minimax unbeatable AI mode'],
    tags: ['Strategy', 'AI', 'Turn-Based']
  },
  {
    id: 'memorymatch',
    slug: 'memorymatch',
    title: 'Memory Match',
    description: 'Test your brain memory power by revealing pairs of matching futuristic icons in minimal moves.',
    category: 'Puzzle',
    difficulty: 'Medium',
    badgeColor: 'from-purple-500 to-indigo-600',
    accentColor: '#8B5CF6',
    controls: ['Click/Tap cards to flip', 'Select Easy (8), Medium (12) or Hard (16)', 'Match all pairs to win'],
    tags: ['Brain', 'Memory', 'Icons']
  },
  {
    id: 'breakout',
    slug: 'breakout',
    title: 'Breakout',
    description: 'Smash through layers of neon bricks! Collect power-ups like multi-ball, wide paddle, and slow ball.',
    category: 'Classic',
    difficulty: 'Hard',
    badgeColor: 'from-pink-500 to-rose-600',
    accentColor: '#EC4899',
    controls: ['Arrow Keys / A & D / Mouse to slide paddle', 'Space to launch ball', 'Collect falling power-ups'],
    tags: ['Canvas', 'Power-ups', 'Arcade']
  },
  {
    id: 'pong',
    slug: 'pong',
    title: 'Pong',
    description: 'The legendary retro table tennis simulator. Duel against high-speed computer AI or a second player.',
    category: 'Classic',
    difficulty: 'Medium',
    badgeColor: 'from-amber-500 to-orange-600',
    accentColor: '#F59E0B',
    controls: ['Player 1: W / S', 'Player 2: Up / Down Arrows', 'Touch D-Pad on Mobile'],
    tags: ['Retro', '2-Player', 'Physics']
  },
  {
    id: 'spaceshooter',
    slug: 'spaceshooter',
    title: 'Space Shooter',
    description: 'Pilot your starship through waves of enemy armadas, pick up shield & triple laser upgrades, and defeat bosses!',
    category: 'Action',
    difficulty: 'Hard',
    badgeColor: 'from-violet-500 to-purple-700',
    accentColor: '#8B5CF6',
    controls: ['A / D or Left / Right Arrows to move', 'Q to blast lasers', 'Destroy enemies & boss waves'],
    tags: ['Action', 'Canvas', 'Boss Battles']
  }
];

export const CATEGORIES = ['All', 'Arcade', 'Puzzle', 'Classic', 'Action'];
