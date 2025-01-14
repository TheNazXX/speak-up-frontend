'use client';

import { wordsService } from '@/app/(pages)/words/model/services/words.service';
import { useQuery } from '@tanstack/react-query';

import Loader from '@/components/ui/loader/Loader';

import { toast, Toaster } from 'sonner';

import Error from '@/components/ui/error/Error';
import { errorCatch } from '@/app/api/error';
import WordsList from './WordsList';
import { WithHeaderState } from '@/app/hoc/WithHeaderState';
import { useEffect, useState } from 'react';
import { IWord } from '../model/types/word.types';

function Words() {
  const [wordsData, setWordsData] = useState<null | IWord[]>(null);

  const { data, isFetching, error } = useQuery({
    queryKey: ['/words'],
    queryFn: () => wordsService.getAll(),
    retry: 1,
    staleTime: 0,
  });

  useEffect(() => {
    if (data?.data && !(isFetching || error)) {
      toast.success('Words was successfully load');
      setWordsData(data.data);
    }
  }, [data, isFetching]);

  let content;

  if (error && !isFetching) {
    content = (
      <Error
        className="absolute top-1/2 left-1/2"
        message={data?.error || errorCatch(error)}
      />
    );
  }

  if (isFetching && !error) {
    content = (
      <div className="absolute top-1/2 left-1/2">
        <Loader />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[1fe]">
      <div>{content}</div>
      {!!wordsData?.length && <WordsList data={wordsData} />}
      <Toaster richColors />
    </div>
  );
}

export default WithHeaderState(Words, 'words');
