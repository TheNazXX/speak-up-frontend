import { ISentence } from '@/src/app/(pages)/words/model/types/sentence.types';
import { IBase } from '@/src/app/types/root.types';

export interface IPhrase extends IBase {
  en: string;
  translate: string[];
  sentences: ISentence[];
}

export interface IPostPhraseDto {
  en: string;
  translate: string[];
  sentences: string[];
}
