'use client';

import { useSentences, IUseSentences } from '@/src/app/hook/useSentences';
import { PhraseForm } from './PhraseForm';
import { Sentences } from '@/src/components/sentences/Sentences';

export default function CreatePhrasePage() {
  const { sentences, onAddSentence, onResetSentences }: IUseSentences =
    useSentences();

  return (
    <>
      <PhraseForm
        mode="create"
        onAddSentence={onAddSentence}
        onResetSentences={onResetSentences}
      />
      <hr className="my-10 border-grayLight" />
      <Sentences sentences={sentences} />
    </>
  );
}
