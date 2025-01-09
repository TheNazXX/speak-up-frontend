'use client';

import { useState, useEffect } from 'react';
import { Sentences } from '@/components/Sentences/Sentences';
import WordForm from '../../create/WordForm';
import { IWord } from '../../model/types/word.types';
import { IUseSentences, useSentences } from '@/app/hook/useSentences';
import { ISentence, ISentencePatchDto } from '../../model/types/sentence.types';
import { wordsService } from '../../model/services/words.service';
import { useQuery } from '@tanstack/react-query';
import { toast, Toaster } from 'sonner';
import Loader from '@/components/ui/loader/Loader';
import { SentencesEditForm } from '@/components/Sentences/SentencesEditForm';
import { sentencesService } from '@/app/services/sentences/sentences.service';
import { useMutation } from '@tanstack/react-query';

import { Plus } from 'lucide-react';
import Button from '@/components/ui/button/Button';

export default function WordEditPage({ slug }: { slug: string }) {
  const [localWordData, setLocalWordData] = useState<null | IWord>(null);
  const [localSentencesData, setLocalSentencesData] = useState<ISentence[]>([]);
  // const {
  //   sentences,
  //   onAddSentence,
  //   onResetSentences,
  //   onSetSentences,
  // }: IUseSentences = useSentences(localWordData?.sentences || []);

  const { data, isFetching, error } = useQuery({
    queryKey: ['/words/:en'],
    queryFn: () => wordsService.get(slug),
    retry: 1,
    staleTime: 0,
  });

  const {
    data: sentencesData,
    isFetching: sentencesIsFetching,
    error: sentencesError,
  } = useQuery({
    queryKey: ['/sentences/word'],
    queryFn: () => sentencesService.getByWord(slug),
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

  const { mutate: addSentenceMutation, status: addSentenceMutationStatus } =
    useMutation({
      mutationFn: ({ en, sentence }: { en: string; sentence: string }) =>
        wordsService.createSentence(en, sentence),
      onSuccess: (data: IWord) => {
        setLocalSentencesData(data.sentences);
        toast.success('Sentence successfully added');
      },
      onError: (error: any) => {
        toast.success('Something went wrong');
      },
    });

  const {
    mutate: deleteSentenceMutation,
    status: deleteSentenceMutationStatus,
  } = useMutation({
    mutationFn: ({ id }: { id: string }) => sentencesService.delete(id),
    onSuccess: (data: ISentence) => {
      setLocalSentencesData((state) => [
        ...state.filter((currentSentences) => {
          return currentSentences.id !== data.id;
        }),
      ]);
      toast.success('Sentence successfully deleted');
    },
    onError: (error: any) => {
      toast.success('Something went wrong');
    },
  });

  useEffect(() => {
    if (!(sentencesError || sentencesIsFetching) && sentencesData?.data) {
      setLocalSentencesData(sentencesData.data);
    }
  }, [sentencesData, sentencesIsFetching]);

  useEffect(() => {
    if (!(error || isFetching) && data?.data) {
      setLocalWordData(data.data);
      toast.success('Word was found');
    }
  }, [data, isFetching]);

  const onResetSentences = () => {};

  const onEditSentence = (id: string, text: string) => {
    mutate({ id, text });
  };

  const onDeleteSentence = (id: string) => {
    deleteSentenceMutation({ id });
  };

  const onAddSentence = (text: string) => {
    addSentenceMutation({ en: localWordData!.en, sentence: text });
  };

  return (
    <>
      {localWordData && !isFetching && (
        <>
          <WordForm
            isToaster={false}
            mode="update"
            word={localWordData}
            onAddSentence={onAddSentence}
            onResetSentences={onResetSentences}
          />
          <hr className="my-10 border-blue-500" />
          <div className="pb-6 pl-6">
            {(sentencesIsFetching ||
              addSentenceMutationStatus === 'pending') && <Loader />}
            {!sentencesIsFetching && (
              <SentencesEditForm
                isFetch={
                  addSentenceMutationStatus === 'pending' ||
                  deleteSentenceMutationStatus === 'pending' ||
                  updateSentenceStatus === 'pending'
                }
                sentences={localSentencesData}
                onEditSentence={onEditSentence}
                onDeleteSentence={onDeleteSentence}
                onAddSentence={onAddSentence}
              />
            )}
          </div>
        </>
      )}
      <Toaster richColors expand={true} />
    </>
  );
}
