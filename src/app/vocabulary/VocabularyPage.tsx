'use client';

import { useSelector } from 'react-redux';
import { WithHeaderState } from '../hoc/WithHeaderState';
import { selectActiveVocabulary } from './model/vocabularySlice';
import Words from '../(pages)/words/components/Words';
import Phrases from '../(pages)/phrases/Phrases';

function VocabularyPage() {
  const activeVocabulary = useSelector(selectActiveVocabulary);
  let content;

  switch (activeVocabulary) {
    case 'words': {
      content = <div>{<Words />}</div>;
      break;
    }
    case 'phrases': {
      content = <div>{<Phrases />}</div>;
      break;
    }
  }

  return <div className="flex gap-4">{content}</div>;
}

export default WithHeaderState(VocabularyPage, 'vocabulary');
