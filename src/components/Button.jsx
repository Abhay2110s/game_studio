import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../context/SoundContext';

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  disabled = false,
  ...props
}) => {
  const { playClick } = useSound();

  const handleOnClick = (e) => {
    if (!disabled) {
      playClick();
      if (onClick) onClick(e);
    }
  };

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-700/50 border border-purple-400/20',
    secondary: 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 hover:border-slate-500/80 shadow-md',
    cyan: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/30 hover:shadow-cyan-600/50 border border-cyan-300/20',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-900/30',
    outline: 'bg-transparent border border-purple-500/40 hover:bg-purple-500/10 text-purple-300 hover:text-white',
    ghost: 'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-semibold',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={handleOnClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      {children}
    </motion.button>
  );
};

export default Button;
