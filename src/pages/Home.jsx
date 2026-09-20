import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, ShieldCheck } from 'lucide-react';
import { GAMES_DATA } from '../data/games';
import GameCard from '../components/GameCard';
import Button from '../components/Button';
import Hero from '../components/Hero';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-12 md:gap-20 overflow-hidden">

      {/* SNAKE PLAY HERO SECTION */}
      <Hero />

      {/* FEATURED GAMES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b-[3.5px] border-[#245E67] pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#FFF8E7] text-shadow-teal tracking-tight flex items-center gap-3">
              <Flame className="w-8 h-8 text-[#F5D66B]" />
              FEATURED GAMES
            </h2>
            <p className="text-[#D7EEF0] text-sm sm:text-base font-bold mt-1">
              Select your favorite 2D arcade challenge and jump straight into the action.
            </p>
          </div>

          <Button
            onClick={() => navigate('/games')}
            variant="outline"
            size="sm"
          >
            View All 6 Games →
          </Button>
        </div>

        {/* 6 Game Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GAMES_DATA.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>



    </div>
  );
};

export default Home;
