import { IBase } from '@/app/types/root.types';

export type IVocabularyType = 'word' | 'phrase';

export interface IVocabularyItem extends IBase {
  en: string;
  translate: string[];
  type: string;
  sentences: string[];
}

export interface IVocabularyPostDto {
  en: string;
  translate: string[];
  partOfSpeech: string | null;
  type: IVocabularyType;
  sentences: string[] | null;
  lessonId: string | null;
}
