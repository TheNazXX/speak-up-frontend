'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { PhraseForm } from '../../create/PhraseForm';
import { phrasesService } from '../../model/services/phrases.service';
import { Toaster, toast } from 'sonner';
import Loader from '@/components/ui/loader/Loader';
import { WithHeaderState } from '@/app/hoc/WithHeaderState';
import Button from '@/components/ui/button/Button';
import { Plus } from 'lucide-react';
import { sentencesService } from '@/app/services/sentences/sentences.service';
import { useEffect, useState } from 'react';
import {
  ISentence,
  ISentencePatchDto,
} from '@/app/(pages)/words/model/types/sentence.types';
import { SentencesEditForm } from '@/components/Sentences/SentencesEditForm';

const PhraseEditPage = ({ slug }: { slug: string }) => {
  const [localSentencesData, setLocalSentencesData] = useState<ISentence[]>([]);

  const { data, isFetching, error } = useQuery({
    queryKey: ['/phrase/en'],
    queryFn: () => phrasesService.get(slug),
    retry: 1,
    staleTime: 0,
  });

  const {
    data: sentencesData,
    isFetching: sentencesIsFetching,
    error: sentencesError,
  } = useQuery({
    queryKey: ['/sentences/en'],
    queryFn: () => sentencesService.getByPhrase(slug),
    retry: 1,
    staleTime: 0,
  });

  const { mutate, status } = useMutation({
    mutationFn: ({ id, text }: ISentencePatchDto) =>
      sentencesService.update(id, text),
    onSuccess: (data) => {
      setLocalSentencesData((state) => [
        ...state.map((sentence) => {
          if (sentence.id === data.id) {
            console.log('1');
            return {
              ...sentence,
              text: data.text,
            };
          }
          return sentence;
        }),
      ]);
      toast.success('Sentence successfully changed');
    },
    onError: (error, data) => {},
  });

  useEffect(() => {
    if (!(sentencesError || sentencesIsFetching) && sentencesData?.data) {
      setLocalSentencesData(sentencesData.data);
    }
  }, [sentencesData, sentencesIsFetching]);

  const onEditSentence = (id: string, text: string) => {
    mutate({ id, text });
  };

  return (
    <>
      {isFetching && <Loader />}
      {!!data?.data && !isFetching && (
        <PhraseForm mode={'update'} phrase={data.data} />
      )}
      <hr className="my-10 border-blue-500" />
      <div className="pb-6 pl-6">
        {status === 'pending' ? (
          <Loader />
        ) : (
          <div className="flex gap-2 items-center mb-4">
            <Button size={'sm'}>
              <Plus className="h-4 w-4" />
            </Button>
            <span className="">Add sentece</span>
          </div>
        )}
        {sentencesIsFetching && <Loader />}
        {!sentencesIsFetching && !!sentencesData?.data.length && (
          <SentencesEditForm
            sentences={localSentencesData}
            onEditSentence={onEditSentence}
          />
        )}
      </div>

      <Toaster richColors />
    </>
  );
};

export default WithHeaderState(PhraseEditPage, 'phrases');
