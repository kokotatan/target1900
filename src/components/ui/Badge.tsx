import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary', 
  className = '' 
}) => {
  const variants = {
    primary: 'bg-[var(--accent)] text-white',
    secondary: 'bg-black text-white',
    outline: 'border-2 border-black text-black',
  };

  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter ${variants[variant]} ${className}`} style={{ borderRadius: 0 }}>
      {children}
    </span>
  );
};
