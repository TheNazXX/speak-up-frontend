import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IWord } from '../words/model/types/word.types';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import { useMutation } from '@tanstack/react-query';
import { repeatWordsService } from '@/app/services/repeat-words.service';
import { IRepeatWord } from '@/app/types/repeat-words';
import { toast } from 'sonner';
import { Ban, Check } from 'lucide-react';

interface IRepeatModal {
  words: IRepeatWord[];
  onHandleClose: () => void;
  isOpen: boolean;
}

type RepeatType = 'en' | 'ua';

export const RepeatWordsModal = ({
  onHandleClose,
  isOpen,
  words,
}: IRepeatModal) => {
  const [repeatType, setRepeatType] = useState<RepeatType | null>(null);

  const [inccorectWords, setInccorectWords] = useState<IRepeatWord[]>([]);
  const [rightWords, setRightWords] = useState<IRepeatWord[]>([]);
  const [wordsQueue, setWordsQueue] = useState<IRepeatWord[]>(words);

  const [currentAnswer, setCurrentAnswer] = useState<string>('');

  // const { mutate, status } = useMutation({
  //   mutationFn: (data: IRepeatWord[]) =>
  //     repeatWordsService.postIncorrectWords(data),
  //   onSuccess: (data) => {},
  //   onError: (error, data) => {},
  // });

  const onSkipWord = () => {
    setWordsQueue((words) => {
      setInccorectWords((words) => [...words, wordsQueue.slice(0, 1)[0]]);
      setCurrentAnswer('');
      return words.slice(1);
    });
  };

  const onHandleNext = () => {
    if (checkAnswer(repeatType!, currentAnswer, wordsQueue[0].word)) {
      toast.success('Right!');
    } else {
      setInccorectWords((words) => [...words, wordsQueue[0]]);
      toast.error('Wrong!');
    }

    setCurrentAnswer('');
    setWordsQueue((words) => {
      return words.slice(1);
    });
  };

  useEffect(() => {
    if (!!!wordsQueue.length) {
      // mutate(inccorectWords);
      // onHandleClose();
    }
  }, [wordsQueue]);

  const checkAnswer = (
    type: RepeatType,
    answer: string,
    currentWord: IWord
  ) => {
    switch (type) {
      case 'ua': {
        return answer.trim() === currentWord.en;
      }
      case 'en': {
        const initialLength = currentWord.translate.length;

        return (
          currentAnswer.split(', ').length === initialLength &&
          initialLength ===
            currentAnswer
              .split(', ')
              .filter((item) => currentWord.translate.includes(item)).length
        );
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onHandleClose}>
      <DialogContent className="opacity-100 bg-black">
        <DialogHeader>
          <DialogTitle className="capitalize text-center text-blue-500">
            Repeat Words
          </DialogTitle>
          <div>
            {!repeatType ? (
              <div className="flex items-center justify-center gap-3 mt-3">
                <Button onClick={() => setRepeatType('en')}>In Ua</Button>
                <Button onClick={() => setRepeatType('ua')}>In Eu</Button>
              </div>
            ) : wordsQueue.length > 0 ? (
              <RepeatStep
                currentAnswer={currentAnswer}
                setCurrectAnswer={setCurrentAnswer}
                word={wordsQueue[0]}
                repeatType={repeatType}
                onSkipWord={onSkipWord}
                onHandleNext={onHandleNext}
              />
            ) : (
              <div className="mt-4">
                <div className="flex items-center gap-1.5 pb-1 border-b border-blue-600 mb-3">
                  <Check className="text-green-500 w-4 h-4" />
                  <h3 className="font-medium">Correct Words</h3>
                </div>
                <div className="flex gap-2 mb-8">
                  {!!inccorectWords.length ? (
                    inccorectWords.map((word) => (
                      <div
                        key={word.en}
                        className="bg-green-600 px-2 py-1 rounded-md font-medium"
                      >
                        {word.en}
                      </div>
                    ))
                  ) : (
                    <span>Empty</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 pb-1 border-b border-blue-600 mb-3">
                  <Ban className="text-red-600 w-4 h-4" />
                  <h3 className="font-medium">Incorrect Words</h3>
                </div>
                <div className="flex gap-2 mb-8">
                  {true ? (
                    inccorectWords.map((word) => (
                      <div
                        key={word.en}
                        className="bg-red-600 px-2 py-1 rounded-md font-medium"
                      >
                        {word.en}
                      </div>
                    ))
                  ) : (
                    <span>Empty</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogHeader>

        <Button variant={'primary'}>Done</Button>
      </DialogContent>
    </Dialog>
  );
};

const RepeatStep = ({
  word,
  repeatType,
  onSkipWord,
  onHandleNext,
  currentAnswer,
  setCurrectAnswer,
}: {
  word: IRepeatWord;
  repeatType: RepeatType;
  onSkipWord: () => void;
  onHandleNext: () => void;

  currentAnswer: string;
  setCurrectAnswer: (answer: string) => void;
}) => {
  switch (repeatType) {
    case 'en': {
      return (
        <div className="text-center pt-8">
          <div className="mb-4 text-left">{word.en}</div>
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
            {word.word.translate.map((item) => (
              <span className="capitalize" key={item}>
                {item}
              </span>
            ))}
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
