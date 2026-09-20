import React from 'react';
import { motion } from 'framer-motion';

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
  const handleOnClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const baseStyles = 'inline-flex items-center justify-center font-black rounded-xl transition-all duration-150 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:translate-y-0.5 active:shadow-none';

  const variants = {
    primary: 'bg-[#F5D66B] hover:bg-[#FBE585] text-[#245E67] border-[3px] border-[#245E67] shadow-[4px_4px_0px_#905080] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#905080]',
    secondary: 'bg-[#FFF8E7] hover:bg-white text-[#245E67] border-[3px] border-[#245E67] shadow-[4px_4px_0px_#905080] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#905080]',
    cyan: 'bg-[#70D0F0] hover:bg-[#8CE0FC] text-[#245E67] border-[3px] border-[#245E67] shadow-[4px_4px_0px_#905080] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#905080]',
    emerald: 'bg-[#72C96B] hover:bg-[#8BD885] text-[#245E67] border-[3px] border-[#245E67] shadow-[4px_4px_0px_#905080] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#905080]',
    brick: 'bg-[#E48170] hover:bg-[#F09A79] text-[#FFF8E7] border-[3px] border-[#245E67] shadow-[4px_4px_0px_#905080] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#905080]',
    danger: 'bg-[#B85F68] hover:bg-[#E48170] text-[#FFF8E7] border-[3px] border-[#245E67] shadow-[4px_4px_0px_#245E67] hover:-translate-y-0.5',
    outline: 'bg-[#FFF8E7] hover:bg-white text-[#245E67] border-[3px] border-[#245E67] shadow-[3px_3px_0px_#905080] hover:-translate-y-0.5',
    ghost: 'bg-transparent hover:bg-[#FFF8E7]/50 text-[#245E67] hover:text-[#245E67]',
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
