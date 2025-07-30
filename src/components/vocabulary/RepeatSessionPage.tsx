'use client';

import { IVocabularyItem } from '@/app/(pages)/vocabulary/model/types';
import { VocabularyList } from './ui/VocabularyList';
import Button from '../ui/button/Button';
import { ArrowBigRight, Check, CircleX, Clock, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RepeatSessionEntity } from './ui/RepeatSessionEntity';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { vocabularyService } from '@/app/services/vocabulary/vocabulary.service';
import { RepeatSessionAllEntities } from './ui/RepeatSessionAllEntities';

type REPEAT_TYPE = 'en' | 'ua' | 'all';

export const RepeatSessionPage = ({ data }: { data: IVocabularyItem[] }) => {
  const router = useRouter();
  const [initialEnities, setInitialEnities] = useState<IVocabularyItem[]>(data);
  const [correctEnities, setCorrectEnities] = useState<IVocabularyItem[]>([]);
  const [incorrectEnities, setIncorrectEnities] = useState<IVocabularyItem[]>(
    []
  );
  const [sessionTargetIndex, setSessionTargetIndex] = useState<number>(0);
  const [isSessionFinished, setIsSessionFinished] = useState<boolean>(false);
  const [repeatType, setRepeatType] = useState<REPEAT_TYPE>('en');

  const [isSession, setIsSession] = useState<boolean>(false);

  const { mutate: handleFetchRightEntities } = useMutation({
    mutationFn: async (data: IVocabularyItem[]) =>
      vocabularyService.updateVocabularyRepeating(data),
    onSuccess: () => {
      toast.success('Session completed successfully!');
    },
  });

  const handleStartSession = () => {
    setIsSession(true);
  };

  const handleEndSession = () => {
    setIsSessionFinished(true);
  };

  const handleNextStep = () => {
    const skipOne = 1;

    if (sessionTargetIndex + skipOne === initialEnities.length) {
      setIsSessionFinished(true);
      handleFetchRightEntities(correctEnities);
    } else {
      setSessionTargetIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (isSessionFinished) {
      handleFetchRightEntities(correctEnities);
    }
  }, [isSessionFinished]);

  const handleResetSession = () => {
    setIsSessionFinished(false);
    setSessionTargetIndex(0);
    setCorrectEnities([]);
    setIncorrectEnities([]);
    setIsSession(false);
    setInitialEnities(incorrectEnities);
    toast.success('Session has been reset successfully!');
  };

  const handleEntity = (
    entity: IVocabularyItem,
    type: 'correct' | 'incorrect'
  ) => {
    switch (type) {
      case 'correct':
        setCorrectEnities((prev) => [...prev, entity]);
        break;
      case 'incorrect':
        setIncorrectEnities((prev) => [...prev, entity]);
        break;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <h3 className="text-[22px]/[25px]">Session</h3>
          </div>
          {!isSession ? (
            <Button
              disabled={!!!initialEnities.length}
              size={'sm'}
              className="hover:translate-x-1 transition-transform"
              onClick={handleStartSession}
            >
              <ArrowBigRight />
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="px-2 rounded-sm bg-primaryLight">
                {sessionTargetIndex + 1}
              </div>
              -
              <div className="px-2 rounded-sm bg-primaryLight">
                {initialEnities.length}
              </div>
            </div>
          )}

          <div className="flex gap-2 ml-auto">
            <Button
              size={'sm'}
              onClick={() => setRepeatType('en')}
              disabled={repeatType === 'en'}
            >
              EN
            </Button>
            <Button
              size={'sm'}
              onClick={() => setRepeatType('ua')}
              disabled={repeatType === 'ua'}
            >
              UA
            </Button>
            <Button
              size={'sm'}
              onClick={() => setRepeatType('all')}
              disabled={repeatType === 'all'}
            >
              ALL
            </Button>
          </div>
        </div>
        {isSessionFinished && (
          <Button
            size={'sm'}
            variant={'success'}
            onClick={handleResetSession}
            disabled={!!!incorrectEnities.length}
            className="ml-2"
          >
            <RefreshCcw />
          </Button>
        )}
      </div>
      <hr className="my-5 text-gray" />
      {!isSession && <VocabularyList data={initialEnities} />}
      {isSession && !isSessionFinished && (
        <>
          {repeatType === 'en' && (
            <RepeatSessionEntity
              currentIndex={sessionTargetIndex}
              totalEntities={initialEnities.length}
              entity={initialEnities[sessionTargetIndex]}
              handleNextStep={handleNextStep}
              handleEntity={handleEntity}
            />
          )}
          {repeatType === 'all' && (
            <RepeatSessionAllEntities
              handleEndSession={handleEndSession}
              correctEnities={correctEnities}
              handleEntity={handleEntity}
              entities={initialEnities}
            />
          )}
        </>
      )}
      {isSessionFinished && (
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-1 mb-2">
              <Check className="text-green-600 w-4 h-4" />
              <h4 className="text-[14px]/[18px]">Correct vocabulary</h4>
            </div>

            {!!correctEnities.length ? (
              <VocabularyList className="mt-4" data={correctEnities} />
            ) : (
              <span className="text-gray text-[14px]/[18px] pl-5">Empty</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1 mb-2">
              <CircleX className="text-red-600 w-4 h-4" />
              <h4 className="text-[14px]/[18px]">Incorrect vocabulary</h4>
            </div>

            {!!incorrectEnities.length ? (
              <VocabularyList className="mt-4" data={incorrectEnities} />
            ) : (
              <span className="text-gray text-[14px]/[18px] pl-5">Empty</span>
            )}
          </div>
        </div>
      )}
      <Toaster richColors />
    </>
  );
};
