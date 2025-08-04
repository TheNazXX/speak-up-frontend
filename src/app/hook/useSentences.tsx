import { useState } from 'react';
import { ISentence } from '../(pages)/words/model/types/sentence.types';

export interface IUseSentences {
  sentences: string[];
  onAddSentence: (sentence: string) => void;
  onResetSentences: () => void;
  onSetSentences: (sentences: string[]) => void;
}

export const useSentences = (localSentences: string[] = []): IUseSentences => {
  const [sentences, setSentences] = useState<string[]>(localSentences);

  const onAddSentence = (sentence: string) => {
    setSentences((state) => [...state, sentence]);
  };

  const onResetSentences = () => {
    setSentences([]);
  };

  const onSetSentences = (senteces: string[]) => {
    setSentences(senteces);
  };

  return { sentences, onAddSentence, onResetSentences, onSetSentences };
};
