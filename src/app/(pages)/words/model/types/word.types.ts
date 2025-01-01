import { IBase } from '@/app/types/root.types';
import { ISentence } from './sentence.types';

export interface IWord extends IBase {
  en: string;
  translate: string[];
  partOfSpeech: string;
  sentences: ISentence[];
}

export interface IWordPostDto {
  en: string;
  translate: string[];
  partOfSpeech: string;
  sentences: string[];
}
