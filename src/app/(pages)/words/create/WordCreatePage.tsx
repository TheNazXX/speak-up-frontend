'use client';

import { useState } from 'react';
import WordForm from './WordForm';
import { Sentences } from '@/components/Sentences/Sentences';
import { IUseSentences, useSentences } from '@/app/hook/useSentences';

export default function WordCreatePage() {
  const { sentences, onAddSentence, onResetSentences }: IUseSentences =
    useSentences();
  return (
    <div className="">
      <WordForm
        onAddSentence={onAddSentence}
        onResetSentences={onResetSentences}
      />
      <hr className="my-10 border-blue-400" />
      <Sentences sentences={sentences} />
    </div>
  );
}
