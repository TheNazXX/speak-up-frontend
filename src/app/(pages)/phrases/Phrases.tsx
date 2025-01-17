'use client';

import { WithHeaderState } from '@/app/hoc/WithHeaderState';
import { useQuery } from '@tanstack/react-query';
import { phrasesService } from './model/services/phrases.service';
import Error from '@/components/ui/error/Error';
import Loader from '@/components/ui/loader/Loader';
import { Toaster, toast } from 'sonner';
import { errorCatch } from '@/app/api/error';
import PhrasesList from './PhrasesList';
import { useEffect, useState } from 'react';
import { IPhrase } from './model/types/phrase.types';

function Phrases() {
  const [localData, setLocalData] = useState<IPhrase[] | null>(null);
  const { data, isFetching, error } = useQuery({
    queryKey: ['/phrases'],
    queryFn: () => phrasesService.getAll(),
    staleTime: 0,
    retry: 1,
  });

  let content;

  if (data?.data && !(isFetching || error)) {
  }

  useEffect(() => {
    if (data?.data && !(isFetching || error)) {
      toast.success('Phrase was successfully load');
      setLocalData(data.data);
    }
  }, [isFetching, data]);

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
      {localData && <PhrasesList data={localData} />}
      <Toaster richColors />
    </div>
  );
}

export default WithHeaderState(Phrases, 'phrases');
