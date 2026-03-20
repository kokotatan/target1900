import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-black text-white p-6 mb-8 border-b-4 border-[var(--accent)] sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">
            Target <span className="text-[var(--accent)]">1900</span>
          </h1>
          <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">
            Vocab Learning System v2
          </p>
        </div>
        <div className="w-8 h-8 border-2 border-[var(--accent)] flex items-center justify-center font-black italic">
          K
        </div>
      </div>
    </header>
  );
};
