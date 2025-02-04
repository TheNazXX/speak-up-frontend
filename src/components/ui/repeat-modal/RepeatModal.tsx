import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IWord } from '../../../app/(pages)/words/model/types/word.types';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import { useMutation } from '@tanstack/react-query';
import { repeatWordsService } from '@/app/services/repeat-words.service';
import { IRepeatWord } from '@/app/types/repeat-words';
import { toast } from 'sonner';
import { Ban, Check } from 'lucide-react';
import { IResponse } from '@/app/types/root.types';
import Loader from '@/components/ui/loader/Loader';
import { IRepeatPhrase } from '@/app/(pages)/repeat-phrases/model/types/repeat-phrases.types';
import { RepeatModalDataTypes } from './model/repeatModal.types';
import { IPhrase } from '@/app/(pages)/phrases/model/types/phrase.types';
import { repeatPhrasesService } from '@/app/services/repeat-pharases.service';

interface IRepeatModalProps {
  data: RepeatModalDataTypes[];
  onHandleClose: () => void;
  isOpen: boolean;
  getRepeatEntitiesRefetch: () => void;
  repeatVariant: 'word' | 'phrase';
}

type RepeatType = 'en' | 'ua';

export const RepeatEntityModal = ({
  onHandleClose,
  isOpen,
  data,
  getRepeatEntitiesRefetch,
  repeatVariant,
}: IRepeatModalProps) => {
  const [repeatType, setRepeatType] = useState<RepeatType | null>(null);

  const [incorrectEnities, setIncorrectEnities] = useState<
    RepeatModalDataTypes[]
  >([]);
  const [correctEnities, setCorrectEnities] = useState<RepeatModalDataTypes[]>(
    []
  );
  const [repeatsQueue, setRepeatsQueue] =
    useState<RepeatModalDataTypes[]>(data);

  const [currentAnswer, setCurrentAnswer] = useState<string>('');

  const { mutate: postCorrectWords, status: postCorrectWordsLoading } =
    useMutation({
      mutationFn: (data: RepeatModalDataTypes[]) =>
        repeatVariant === 'word'
          ? repeatWordsService.postCorrectWordsIdx(
              data.map((item: RepeatModalDataTypes) => item.id)
            )
          : repeatPhrasesService.postCorrectPhrasesIdx(
              data.map((item: RepeatModalDataTypes) => item.id)
            ),
      onSuccess: (data: IResponse<RepeatModalDataTypes[]>) => {
        if (data?.data?.length === 0) {
          getRepeatEntitiesRefetch();
        }

        onResetSession(data?.data || []);
        toast.success('Repeats successfully updated');
      },
      onError: (error, data) => {},
    });

  const onSkipWord = () => {
    setRepeatsQueue((repeatsQueue) => {
      setIncorrectEnities((incorrectEnities) => [
        ...incorrectEnities,
        repeatsQueue.slice(0, 1)[0],
      ]);
      setCurrentAnswer('');
      return repeatsQueue.slice(1);
    });
  };

  const onHandleNext = () => {
    if (
      checkAnswer(
        repeatType!,
        currentAnswer,
        // @ts-ignore
        repeatsQueue[0][repeatVariant]
      )
    ) {
      setCorrectEnities((repeats) => [...repeats, repeatsQueue[0]]);
      toast.success('Right!');
    } else {
      setIncorrectEnities((incorrectEntities) => [
        ...incorrectEntities,
        repeatsQueue[0],
      ]);
      toast.error('Wrong!');
    }

    setCurrentAnswer('');
    setRepeatsQueue((repeats) => {
      return repeats.slice(1);
    });
  };

  const onResetSession = (data: RepeatModalDataTypes[]) => {
    onHandleClose();
    setRepeatType(null);
    setRepeatsQueue(data);
    setCorrectEnities([]);
    setIncorrectEnities([]);
    getRepeatEntitiesRefetch();
  };

  const checkAnswer = (
    type: RepeatType,
    answer: string,
    currentRepeat: IWord | IPhrase
  ) => {
    switch (type) {
      case 'ua': {
        return (
          answer.trim().toLowerCase() === currentRepeat.en.toLocaleLowerCase()
        );
      }
      case 'en': {
        const initialLength = currentRepeat.translate.length;

        return (
          currentAnswer.split(', ').length === initialLength &&
          initialLength ===
            currentAnswer
              .split(', ')
              .filter((item) => currentRepeat.translate.includes(item)).length
        );
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onHandleClose}>
      <DialogContent className="opacity-100 bg-black">
        <DialogHeader>
          <DialogTitle className="capitalize text-center text-blue-500">
            Repeat {repeatVariant === 'phrase' ? 'Phrases' : 'Words'}
          </DialogTitle>
          <div>
            {!repeatType ? (
              <div className="flex items-center justify-center gap-3 mt-3">
                <Button onClick={() => setRepeatType('en')}>In Ua</Button>
                <Button onClick={() => setRepeatType('ua')}>In Eu</Button>
              </div>
            ) : repeatsQueue.length > 0 ? (
              <RepeatStep
                currentAnswer={currentAnswer}
                setCurrectAnswer={setCurrentAnswer}
                current={repeatsQueue[0]}
                repeatType={repeatType}
                onSkipWord={onSkipWord}
                onHandleNext={onHandleNext}
                repeatVariant={repeatVariant}
              />
            ) : (
              <>
                <div className="mt-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Check className="text-green-500 w-4 h-4" />
                    <h3 className="font-medium">Correct Words</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {!!correctEnities.length ? (
                      correctEnities.map((entity) => (
                        <div
                          key={entity.en}
                          className="bg-green-600 px-2 py-1 rounded-md font-medium"
                        >
                          {entity.en}
                        </div>
                      ))
                    ) : (
                      <span>Empty</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5  mb-3">
                    <Ban className="text-red-600 w-4 h-4" />
                    <h3 className="font-medium">Incorrect Words</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {!!incorrectEnities.length ? (
                      incorrectEnities.map((entity) => (
                        <div
                          key={entity.en}
                          className="bg-red-600 px-2 py-1 rounded-md font-medium"
                        >
                          {entity.en}
                        </div>
                      ))
                    ) : (
                      <span>Empty</span>
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  {postCorrectWordsLoading === 'pending' ? (
                    <Loader />
                  ) : (
                    <Button
                      onClick={() => {
                        postCorrectWords(correctEnities);
                      }}
                      className="w-full"
                      variant={'primary'}
                    >
                      Done
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const RepeatStep = ({
  current,
  repeatType,

  onSkipWord,
  onHandleNext,
  currentAnswer,
  setCurrectAnswer,
  repeatVariant,
}: {
  current: RepeatModalDataTypes;
  repeatType: RepeatType;
  onSkipWord: () => void;
  onHandleNext: () => void;
  repeatVariant: 'word' | 'phrase';

  currentAnswer: string;
  setCurrectAnswer: (answer: string) => void;
}) => {
  switch (repeatType) {
    case 'en': {
      return (
        <div className="text-center pt-8">
          <div className="mb-4 text-left">{current.en}</div>
          <Input
            value={currentAnswer}
            onChange={(e) => setCurrectAnswer(e.target.value)}
            className="w-full"
            variant={'dark'}
            placeholder="Type translate"
          />
          <div className="flex gap-3 mt-8 justify-center">
            <Button onClick={onHandleNext}>Next</Button>
            <Button onClick={onSkipWord}>Skip</Button>
          </div>
        </div>
      );
    }
    case 'ua': {
      return (
        <div className="text-center pt-8">
          <div className="mb-4 text-left">
            {
              // @ts-ignore
              current[repeatVariant].translate.map(
                (item: string, i: number) => (
                  <span className="capitalize" key={item}>
                    {item}

                    {
                      // @ts-ignore
                      i + 1 !== current[repeatVariant].translate.length && (
                        <>,&nbsp;</>
                      )
                    }
                  </span>
                )
              )
            }
          </div>
          <Input
            value={currentAnswer}
            onChange={(e) => setCurrectAnswer(e.target.value)}
            className="w-full"
            variant={'dark'}
            placeholder="Type translate"
          />
          <div className="flex gap-3 mt-8 justify-center">
            <Button onClick={onHandleNext}>Next</Button>
            <Button onClick={onSkipWord}>Skip</Button>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <div>{repeatType}</div>
    </>
  );
};
