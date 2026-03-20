export interface Section {
  id: number;
  name: string;
  range: [number, number];
  pageStart: number;
}

export const SECTIONS: Section[] = [
  { id: 1, name: 'Section 1', range: [1, 300], pageStart: 20 },
  { id: 2, name: 'Section 2', range: [301, 700], pageStart: 82 },
  { id: 3, name: 'Section 3', range: [701, 1000], pageStart: 162 },
  { id: 4, name: 'Section 4', range: [1001, 1200], pageStart: 222 },
  { id: 5, name: 'Section 5', range: [1201, 1500], pageStart: 262 },
  { id: 6, name: 'Section 6', range: [1501, 1900], pageStart: 322 },
];

export function getSectionForId(id: number): number {
  const section = SECTIONS.find(s => id >= s.range[0] && id <= s.range[1]);
  return section ? section.id : SECTIONS[SECTIONS.length - 1].id;
}

export function getPageForId(id: number): number {
  const section = SECTIONS.find(s => id >= s.range[0] && id <= s.range[1]);
  if (!section) return 0;
  
  // Calculate page based on offset from section start
  // Each page typically contains 5 words in Target 1900
  const offset = id - section.range[0];
  return section.pageStart + Math.floor(offset / 5);
}
