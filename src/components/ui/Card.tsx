import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: 'default' | 'accent';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  title, 
  className = '', 
  variant = 'default' 
}) => {
  const variants = {
    default: 'bg-[var(--bg-main)] border-2 border-black shadow-[6px_6px_0px_#000000]',
    accent: 'bg-[var(--bg-main)] border-2 border-[var(--accent)] shadow-[6px_6px_0px_var(--accent)]',
  };

  return (
    <div className={`p-6 ${variants[variant]} ${className}`} style={{ borderRadius: 0 }}>
      {title && (
        <h3 className="text-xl font-extrabold uppercase tracking-tight mb-4 border-b-2 border-current pb-2">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};
