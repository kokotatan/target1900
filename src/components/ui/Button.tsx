import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none';
  
  const variants = {
    primary: 'bg-[var(--accent)] text-white shadow-[4px_4px_0px_#000000] border-2 border-black',
    secondary: 'bg-[var(--accent-secondary)] text-white shadow-[4px_4px_0px_#FF0000] border-2 border-[#FF0000]',
    outline: 'bg-transparent text-[var(--text-h)] border-2 border-black shadow-[4px_4px_0px_#000000]',
  };

  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ borderRadius: 0 }}
      {...props}
    >
      {children}
    </button>
  );
};
