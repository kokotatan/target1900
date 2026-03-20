import React, { useState, useMemo } from 'react';
import { Header } from './components/ui/Header';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { Badge } from './components/ui/Badge';
import { StudyView } from './components/StudyView';
import { useStudyState } from './hooks/useStudyState';
import { getSampleWords } from './data/words';
import { SECTIONS } from './data/sections';
import './App.css';

type View = 'dashboard' | 'study' | 'review';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [currentSectionId, setCurrentSectionId] = useState<number | null>(null);
  const { masteredIds, reviewIds, markMastered, markForReview } = useStudyState();
  
  const allWords = useMemo(() => getSampleWords(), []);

  const studyWords = useMemo(() => {
    if (view === 'review') {
      return allWords.filter(w => reviewIds.includes(w.id));
    }
    if (view === 'study' && currentSectionId !== null) {
      return allWords.filter(w => w.sectionId === currentSectionId);
    }
    return [];
  }, [view, currentSectionId, allWords, reviewIds]);

  const progressPercentage = (masteredIds.length / allWords.length) * 100;

  if (view !== 'dashboard') {
    return (
      <div className="min-h-screen flex flex-col kotaro-grid">
        <Header />
        <main className="flex-grow">
          <StudyView 
            words={studyWords}
            onFinish={() => setView('dashboard')}
            onMarkMastered={markMastered}
            onMarkForReview={markForReview}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col kotaro-grid">
      <Header />
      
      <main className="flex-grow p-6 space-y-8">
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">
              Dashboard
            </h2>
            <Badge variant="primary">Alpha v2.0</Badge>
          </div>
          
          <Card variant="accent" title="Current Progress">
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-4xl font-black italic">{masteredIds.length}/{allWords.length}</span>
                <span className="text-xs font-bold opacity-50 uppercase tracking-widest">Words Mastered</span>
              </div>
              <div className="h-4 border-2 border-black bg-white overflow-hidden" style={{ borderRadius: 0 }}>
                <div 
                  className="h-full bg-[var(--accent)] border-r-2 border-black transition-all duration-500" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => {
                const firstIncompleteSection = SECTIONS.find(s => {
                  const sectionWords = allWords.filter(w => w.sectionId === s.id);
                  return sectionWords.some(w => !masteredIds.includes(w.id));
                });
                const targetSection = firstIncompleteSection || SECTIONS[0];
                if (targetSection) {
                  setCurrentSectionId(targetSection.id);
                  setView('study');
                }
              }}
            >
              Study Now
            </Button>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => setView('review')}
              disabled={reviewIds.length === 0}
            >
              Review ({reviewIds.length})
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">
            Sections
          </h2>
          <div className="space-y-4">
            {SECTIONS.map((section) => {
              const sectionWords = allWords.filter(w => w.sectionId === section.id);
              const sectionMastered = sectionWords.filter(w => masteredIds.includes(w.id)).length;
              const isFinished = sectionMastered === sectionWords.length;

              return (
                <Card key={section.id} className="flex justify-between items-center py-4">
                  <div>
                    <div className="text-xs font-bold opacity-50 uppercase tracking-widest">Section {section.id}</div>
                    <div className="text-lg font-black uppercase tracking-tight">{section.name}</div>
                    <div className="text-[10px] font-bold opacity-60">
                      {sectionMastered} / {sectionWords.length} Words
                    </div>
                  </div>
                  <Button 
                    variant={isFinished ? "outline" : "primary"} 
                    size="sm"
                    onClick={() => {
                      setCurrentSectionId(section.id);
                      setView('study');
                    }}
                  >
                    {isFinished ? "Review" : "Start"}
                  </Button>
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="p-8 border-t-2 border-black text-center">
        <p className="text-[10px] font-bold tracking-widest uppercase opacity-40">
          DESIGNED BY KOTARO DESIGN LAB
        </p>
      </footer>
    </div>
  );
};

export default App;
