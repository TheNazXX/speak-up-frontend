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

interface IRepeatModal {
  words: IWord[];
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

  const [inccorectWords, setInccorectWords] = useState<IWord[]>([]);
  const [rightWords, setRightWords] = useState<IWord[]>([]);
  const [wordsQueue, setWordsQueue] = useState<IWord[]>(words);

  const { mutate, status } = useMutation({
    mutationFn: (data: IWord[]) => repeatWordsService.postIncorrectWords(data),
    onSuccess: (data) => {},
    onError: (error, data) => {},
  });

  const onSkipWord = () => {
    setWordsQueue((words) => {
      setInccorectWords((words) => [...words, wordsQueue.slice(0, 1)[0]]);
      return words.slice(1);
    });
  };

  useEffect(() => {
    if (!!!wordsQueue.length) {
      mutate(inccorectWords);
      onHandleClose();
    }
  }, [wordsQueue]);

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
                word={wordsQueue[0]}
                repeatType={repeatType}
                onSkipWord={onSkipWord}
              />
            ) : (
              <h3>Finish</h3>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const RepeatStep = ({
  word,
  repeatType,
  onSkipWord,
}: {
  word: IWord;
  repeatType: RepeatType;
  onSkipWord: () => void;
}) => {
  switch (repeatType) {
    case 'en': {
      return (
        <>
          <div className="mb-4">{word.en}</div>
          <Input variant={'dark'} placeholder="Type translate" />
          <div className="flex gap-3 mt-8">
            <Button>Next</Button>
            <Button onClick={onSkipWord}>Skip</Button>
          </div>
        </>
      );
    }
    case 'ua': {
      return (
        <>
          <div className="mb-4">
            {word.translate.map((item) => (
              <span className="capitalize" key={item}>
                {item}
              </span>
            ))}
          </div>
          <Input variant={'dark'} placeholder="Type translate" />
          <div className="flex gap-3 mt-8">
            <Button>Next</Button>
            <Button onClick={onSkipWord}>Skip</Button>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <div>{repeatType}</div>
    </>
  );
};
