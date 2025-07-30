'use client';

import WordForm from './WordForm';
// import { Sentences } from '../../../../components/sentences/Sentences';
import { IUseSentences, useSentences } from '@/src/app/hook/useSentences';

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
      {/* <Sentences sentences={sentences} /> */}
    </div>
  );
}
