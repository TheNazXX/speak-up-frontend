import { IVocabularyItem } from "@/src/app/entities/vocabularly/model/types";

export function getOldest(items: IVocabularyItem[]): IVocabularyItem | null {
  if (!items.length) return null;
  return [...items].sort((a, b) => {
    const aTime = a.repeatedAt ? new Date(a.repeatedAt).getTime() : -Infinity;
    const bTime = b.repeatedAt ? new Date(b.repeatedAt).getTime() : -Infinity;
    if (aTime !== bTime) return aTime - bTime;
    const aCreated = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bCreated = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bCreated - aCreated;
  })[0];
}

export function shuffle<T>(arr: ReadonlyArray<T>): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}