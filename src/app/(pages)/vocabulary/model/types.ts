
import { IBase } from '@/app/types/root.types';

export type IVocabularyType = 'word' | 'phrase';

export interface IPartOfSpeech {
  id: string;
  name: string;
}

export interface IVocabularyItem extends IBase {
  en: string;
  translate: string[];
  type: IVocabularyType;
  sentences: string[];
  partOfSpeech: IPartOfSpeech;
  isDifficult: boolean;
  repeatedAt: Date
}

export interface IVocabularyPostDto {
  en: string;
  translate: string[];
  partOfSpeech: string | null;
  type: IVocabularyType;
  sentences: string[] | null;
  lessonId: string | null;
}
