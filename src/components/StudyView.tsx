import React, { useState } from 'react';
import type { Word } from '../data/words';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

interface StudyViewProps {
  words: Word[];
  onFinish: () => void;
  onMarkMastered: (id: number) => void;
  onMarkForReview: (id: number) => void;
}

export const StudyView: React.FC<StudyViewProps> = ({ 
  words, 
  onFinish, 
  onMarkMastered, 
  onMarkForReview 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const currentWord = words[currentIndex];

  if (!currentWord) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter italic">FINISH</h2>
        <p className="text-center opacity-70 font-bold uppercase tracking-widest text-xs">
          You have completed this session.
        </p>
        <Button onClick={onFinish} className="w-full max-w-[200px]">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const handleCorrect = () => {
    onMarkMastered(currentWord.id);
    nextWord();
  };

  const handleWrong = () => {
    onMarkForReview(currentWord.id);
    nextWord();
  };

  const nextWord = () => {
    setShowMeaning(false);
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="flex flex-col p-6 h-full space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={onFinish}
            className="text-xs font-black uppercase tracking-widest hover:text-[var(--accent)] transition-colors"
          >
            ← Back
          </button>
          <Badge variant="outline">Word {currentWord.id}</Badge>
        </div>
        <div className="text-xs font-black uppercase tracking-widest opacity-40">
          Progress: {currentIndex + 1} / {words.length}
        </div>
      </div>

      <Card variant={showMeaning ? "accent" : "default"} className="flex-grow flex flex-col justify-center items-center text-center p-12 min-h-[300px]">
        <div className="space-y-2">
          <Badge variant="secondary" className="mb-2">{currentWord.partOfSpeech}</Badge>
          <h2 className="text-5xl font-black tracking-tight mb-4 uppercase">
            {currentWord.word}
          </h2>
          
          {showMeaning ? (
            <div className="animate-pop space-y-4">
              <p className="text-2xl font-bold border-t-2 border-black pt-4">
                {currentWord.meaning}
              </p>
              <div className="text-left bg-black text-white p-4 text-xs font-medium border-l-4 border-[var(--accent)]">
                <p className="opacity-50 uppercase tracking-widest font-bold mb-1">Example</p>
                <p className="italic mb-1">"{currentWord.example}"</p>
                <p className="opacity-70">{currentWord.exampleMeaning}</p>
              </div>
            </div>
          ) : (
            <Button 
                variant="outline" 
                onClick={() => setShowMeaning(true)} 
                className="mt-8"
            >
              Show Meaning
            </Button>
          )}
        </div>
      </Card>

      {showMeaning && (
        <div className="grid grid-cols-2 gap-4 animate-pop">
          <Button 
            variant="secondary" 
            className="w-full bg-black text-white"
            onClick={handleWrong}
          >
            Review Later
          </Button>
          <Button 
            variant="primary" 
            className="w-full"
            onClick={handleCorrect}
          >
            I Know This
          </Button>
        </div>
      )}
    </div>
  );
};
