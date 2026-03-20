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

  const getMasteryRank = () => {
    if (progressPercentage >= 100) return { label: 'GOD', color: 'text-red-600' };
    if (progressPercentage >= 80) return { label: 'LEGEND', color: 'text-red-500' };
    if (progressPercentage >= 60) return { label: 'MASTER', color: 'text-orange-500' };
    if (progressPercentage >= 40) return { label: 'EXPERT', color: 'text-yellow-600' };
    if (progressPercentage >= 20) return { label: 'SCHOLAR', color: 'text-blue-600' };
    return { label: 'NOVICE', color: 'text-gray-500' };
  };

  const rank = getMasteryRank();

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
            <Badge variant="primary">Alpha v2.5</Badge>
          </div>
          
          <Card variant="accent" title="Current Progress" className={reviewIds.length > 20 ? "review-alert" : ""}>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-4xl font-black italic mb-1">{masteredIds.length}/{allWords.length}</div>
                  <div className="text-xs font-bold opacity-50 uppercase tracking-widest">Words Mastered</div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-black tracking-tighter italic ${rank.color}`}>{rank.label}</div>
                  <div className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Mastery Rank</div>
                </div>
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
              className="w-full h-16 text-lg"
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
              className={`w-full h-16 text-lg ${reviewIds.length > 0 ? "relative" : ""}`}
              onClick={() => setView('review')}
              disabled={reviewIds.length === 0}
            >
              Review ({reviewIds.length})
              {reviewIds.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-6 w-6">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-red-500 text-[10px] items-center justify-center text-white font-bold">!</span>
                </span>
              )}
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
                <Card key={section.id} className="flex justify-between items-center py-4 relative overflow-hidden">
                  <div className="z-10 bg-white/80 backdrop-blur-sm p-1 rounded-sm">
                    <div className="text-xs font-bold opacity-50 uppercase tracking-widest">Section {section.id}</div>
                    <div className="text-lg font-black uppercase tracking-tight">{section.name}</div>
                    <div className="text-[10px] font-bold opacity-60">
                      {sectionMastered} / {sectionWords.length} Words
                    </div>
                  </div>
                  
                  {isFinished && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                      <div className="stamp-badge text-4xl">CLEARED</div>
                    </div>
                  )}

                  <Button 
                    variant={isFinished ? "outline" : "primary"} 
                    size="sm"
                    className="z-10"
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
