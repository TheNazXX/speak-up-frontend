'use client';

import { useSentences, IUseSentences } from '@/app/hook/useSentences';
import { PhraseForm } from './PhraseForm';
import { Sentences } from '@/components/Sentences/Sentences';

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
      <hr className="my-10 border-blue-400" />
      <Sentences sentences={sentences} />
    </>
  );
}
