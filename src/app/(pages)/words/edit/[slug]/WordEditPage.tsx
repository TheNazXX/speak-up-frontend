'use client';

import { useState, useEffect } from 'react';
import { Sentences } from '@/components/Sentences/Sentences';
import WordForm from '../../create/WordForm';
import { IWord } from '../../model/types/word.types';
import { IUseSentences, useSentences } from '@/app/hook/useSentences';
import { ISentence } from '../../model/types/sentence.types';
import { wordsService } from '../../model/services/words.service';
import { useQuery } from '@tanstack/react-query';
import { toast, Toaster } from 'sonner';
import Loader from '@/components/ui/loader/Loader';

export default function WordEditPage({ slug }: { slug: string }) {
  const [localWordData, setLocalWordData] = useState<null | IWord>(null);
  const {
    sentences,
    onAddSentence,
    onResetSentences,
    onSetSentences,
  }: IUseSentences = useSentences(
    localWordData?.sentences.map((item: ISentence) => item.text) || []
  );

  const { data, isFetching, error } = useQuery({
    queryKey: ['/words/:en'],
    queryFn: () => wordsService.get(slug),
    retry: 1,
    staleTime: 0,
  });

  useEffect(() => {
    if (!(error || isFetching) && data?.data) {
      setLocalWordData(data.data);
      onSetSentences(
        data.data.sentences.map((sentence: ISentence) => sentence.text)
      );
      toast.success('Word was found');
    }
  }, [data, isFetching]);

  return (
    <>
      {isFetching && <Loader />}
      {localWordData && !isFetching && (
        <>
          <WordForm
            mode="update"
            word={localWordData}
            onAddSentence={onAddSentence}
            onResetSentences={onResetSentences}
          />
          <hr className="my-10 border-blue-500" />
          <Sentences sentences={sentences} />
        </>
      )}
      <Toaster richColors expand={true} />
    </>
  );
}
