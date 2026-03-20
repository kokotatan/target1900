import { useState, useEffect } from 'react';

interface StudyState {
  masteredIds: number[];
  reviewIds: number[];
}

export const useStudyState = () => {
  const [state, setState] = useState<StudyState>(() => {
    const saved = localStorage.getItem('target1900_study_state');
    return saved ? JSON.parse(saved) : { masteredIds: [], reviewIds: [] };
  });

  useEffect(() => {
    localStorage.setItem('target1900_study_state', JSON.stringify(state));
  }, [state]);

  const markMastered = (id: number) => {
    setState(prev => ({
      masteredIds: Array.from(new Set([...prev.masteredIds, id])),
      reviewIds: prev.reviewIds.filter(rid => rid !== id)
    }));
  };

  const markForReview = (id: number) => {
    setState(prev => ({
      masteredIds: prev.masteredIds.filter(mid => mid !== id),
      reviewIds: Array.from(new Set([...prev.reviewIds, id]))
    }));
  };

  const resetProgress = () => {
    setState({ masteredIds: [], reviewIds: [] });
  };

  return {
    masteredIds: state.masteredIds,
    reviewIds: state.reviewIds,
    markMastered,
    markForReview,
    resetProgress
  };
};
