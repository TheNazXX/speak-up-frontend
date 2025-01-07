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

  const onAddSentence = () => {};
  const onResetSentences = () => {};

  const onEditSentence = (id: string, text: string) => {
    mutate({ id, text });
  };

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

  return (
    <>
      {isFetching && <Loader />}
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
        </>
      )}
      <Toaster richColors expand={true} />
    </>
  );
}
