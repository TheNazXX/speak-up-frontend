'use client';

import { useMemo, useState } from 'react';
import { useRepeatingQuiz, useSubmitRepeatingAnswer } from '../model/queries';
import { IVocabularyItem } from '@/src/app/entities/vocabularly/model/types';
import { VocabularyButton } from '@/src/app/entities/vocabularly/ui/VocabularyButton';
import { getOldest, shuffle } from '../model/libs';
import { cn } from '@/src/lib/utils';
import { toast, Toaster } from 'sonner';
import Loader from '@/src/components/ui/loader/Loader';
import Button from '@/src/components/ui/button/Button';

export const RepeatQuiz = () => {
  const [repeatType, setRepeatType] = useState<'en' | 'ua'>('en');
  const count = 5;

  const { data, isFetching, isError, refetch } = useRepeatingQuiz(count);
  const list: IVocabularyItem[] = data?.data ?? [];
  const currentTarget = useMemo(() => getOldest(list), [list]);

  const submit = useSubmitRepeatingAnswer(count);

  const [incorrectIds, setIncorrectIds] = useState<string[]>([]);

  const options = useMemo(() => {
    if (!list.length) return [];
    return shuffle(list);
  }, [list, currentTarget?.id]);

  const checkAnswer = (answer: IVocabularyItem) => {
    if (!currentTarget) return;

    if (currentTarget.id !== answer.id) {
      setIncorrectIds((prev) =>
        prev.includes(answer.id) ? prev : [...prev, answer.id]
      );
      return;
    }

    toast.success('Correct answer!');

    submit.mutate(answer, {
      onSuccess: () => {
        setIncorrectIds([]);
      },
      onError: () => {
        toast.error('Failed to submit. Try again.');
      },
    });
  };

  if (isError)
    return (
      <div>
        Error. <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  if (!list.length || !currentTarget) return <div>No items</div>;

  return (
    <div>
      <div className="flex gap-2">
        <Button
          onClick={() => setRepeatType('en')}
          disabled={repeatType === 'en'}
        >
          EN
        </Button>
        <Button
          onClick={() => setRepeatType('ua')}
          disabled={repeatType === 'ua'}
        >
          UA
        </Button>
      </div>
      <div className="text-center pb-2 border-b mb-4">
        <h4 className="text-lg">
          {repeatType === 'en'
            ? currentTarget.en
            : currentTarget.translate.join(', ')}
        </h4>
      </div>

      <div className="flex flex-col gap-2">
        {submit.isPending || isFetching ? (
          <Loader className="mx-auto" />
        ) : (
          options.map((item) => (
            <VocabularyButton
              key={item.id}
              disabled={submit.isPending}
              className={cn(incorrectIds.includes(item.id) && 'border-red-800')}
              onClick={() => checkAnswer(item)}
            >
              {repeatType === 'en' ? item.translate.join(', ') : item.en}
            </VocabularyButton>
          ))
        )}
      </div>

      <Toaster richColors />
    </div>
  );
};
