import wordsData from './words.json';

export interface Word {
  id: number;
  word: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  exampleMeaning: string;
  sectionId: number;
}

// Convert JSON data to Word format with defaults for missing fields
export const ALL_WORDS: Word[] = (wordsData as any[]).map(w => ({
  id: w.id,
  word: w.word,
  meaning: w.meaning,
  partOfSpeech: w.partOfSpeech || "n/a",
  example: w.example || "No example available.",
  exampleMeaning: w.exampleMeaning || "例文なし",
  sectionId: Math.floor((w.id - 1) / 100) + 1
}));

export const getSampleWords = (): Word[] => {
  return ALL_WORDS;
};
