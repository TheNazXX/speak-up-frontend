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
import { IPhrase } from '../../model/types/phrase.types';

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

  const { mutate, status: updateSentenceStatus } = useMutation({
    mutationFn: ({ id, text }: ISentencePatchDto) =>
      sentencesService.update(id, text),
    onSuccess: (data) => {
      setLocalSentencesData((state) => [
        ...state.map((sentence) => {
          if (sentence.id === data.id) {
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

  const { mutate: deletingPhraseMutation, status: deletingSentenceStatus } =
    useMutation({
      mutationFn: ({ id }: { id: string }) => sentencesService.delete(id),
      onSuccess: (data) => {
        setLocalSentencesData((state) =>
          state.filter((sentence) => sentence.id !== data.id)
        );
        toast.success('Sentence successfully deleted');
      },
      onError: (error, data) => {
        toast.error('Something went wrong');
      },
    });

  const { mutate: addingPhraseMutation, status: addingPhraseMutationStatus } =
    useMutation({
      mutationFn: ({ en, sentence }: { en: string; sentence: string }) =>
        phrasesService.addSentences(en, sentence),
      onSuccess: (data: IPhrase) => {
        setLocalSentencesData(data.sentences);
        toast.success('Sentence successfully added');
      },
      onError: (error, data) => {
        toast.error('Something went wrong');
      },
    });

  useEffect(() => {
    if (!(sentencesError || sentencesIsFetching) && sentencesData?.data) {
      setLocalSentencesData(sentencesData.data);
    }
  }, [sentencesData, sentencesIsFetching]);

  const onEditSentence = (id: string, text: string) => {
    mutate({ id, text });
  };

  const onDeleteSentence = (id: string) => {
    deletingPhraseMutation({ id });
  };

  const onAddSentence = (sentence: string) => {
    addingPhraseMutation({ en: data!.data!.en, sentence });
  };

  return (
    <>
      {isFetching && <Loader />}
      {!!data?.data && !isFetching && (
        <PhraseForm mode={'update'} phrase={data.data} />
      )}
      <hr className="my-10 border-blue-500" />
      <div className="pb-6 pl-6">
        {sentencesIsFetching ||
          (addingPhraseMutationStatus === 'pending' && <Loader />)}
        {!sentencesIsFetching && (
          <SentencesEditForm
            sentences={localSentencesData}
            onEditSentence={onEditSentence}
            onAddSentence={onAddSentence}
            onDeleteSentence={onDeleteSentence}
            isFetch={
              updateSentenceStatus === 'pending' ||
              deletingSentenceStatus === 'pending' ||
              addingPhraseMutationStatus === 'pending'
            }
          />
        )}
      </div>

      <Toaster richColors />
    </>
  );
};

export default WithHeaderState(PhraseEditPage, 'phrases');
