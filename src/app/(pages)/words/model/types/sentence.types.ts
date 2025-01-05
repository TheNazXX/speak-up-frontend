import { IBase } from '@/app/types/root.types';

export interface ISentence extends IBase {
  text: string;
}

export interface ISentencePatchDto {
  id: string;
  text: string;
}
