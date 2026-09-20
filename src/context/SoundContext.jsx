import React, { createContext, useContext, useState } from 'react';
import { sound } from '../utils/sound';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sound.muted = nextState;
    if (!nextState) {
      sound.playClick();
    }
  };

  const playClick = () => sound.playClick();
  const playEat = () => sound.playEat();
  const playMatch = () => sound.playMatch();
  const playFlip = () => sound.playFlip();
  const playBounce = () => sound.playBounce();
  const playHit = () => sound.playHit();
  const playShoot = () => sound.playShoot();
  const playExplosion = () => sound.playExplosion();
  const playPowerup = () => sound.playPowerup();
  const playGameOver = () => sound.playGameOver();
  const playVictory = () => sound.playVictory();

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleSound,
        playClick,
        playEat,
        playMatch,
        playFlip,
        playBounce,
        playHit,
        playShoot,
        playExplosion,
        playPowerup,
        playGameOver,
        playVictory,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
