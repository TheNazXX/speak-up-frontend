import { IBase } from '@/app/types/root.types';

export interface IVocabularyByDate {
  [date: string]: IVocabularyItem[];
}

export interface IVocabularyItem extends IBase {
  en: string;
  translate: string[];
  type: string;
  sentences: string[];
}
