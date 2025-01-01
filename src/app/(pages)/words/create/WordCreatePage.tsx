'use client';

import { useState } from 'react';
import WordForm from './WordForm';
import { Sentences } from '@/components/Sentences/Sentences';

export default function WordCreatePage() {
  const [sentences, setSentences] = useState<string[]>([]);

  const onAddSentence = (text: string) => {
    setSentences((state) => [...state, text]);
  };

  return (
    <div className="">
      <WordForm onAddSentence={onAddSentence} />
      <hr className="my-10 border-blue-400" />
      <Sentences sentences={sentences} />
    </div>
  );
}
