import { IVocabularyItem } from '@/src/app/(pages)/vocabulary/model/types';
import Button from '@/src/components/ui/button/Button';
import Input from '@/src/components/ui/input/Input';
import { ArrowRight, Bookmark, Check, Repeat2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface RepeatSessionEntityProps {
  currentIndex: number;
  totalEntities: number;
  entity: IVocabularyItem;
  handleNextStep: () => void;
  handleEntity: (
    entity: IVocabularyItem,
    type: 'correct' | 'incorrect'
  ) => void;
}

export const RepeatSessionEntity = ({
  entity,
  handleNextStep,
  handleEntity,
}: RepeatSessionEntityProps) => {
  const [answer, setAnswer] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleCheckAnswer = () => {
    if (answer.trim() === entity.en) {
      toast.success('Right!');
      handleNextStep();
      handleEntity(entity, 'correct');
    } else {
      toast.error('Nope');
      setIsError(true);
    }

    setAnswer('');
  };

  const handleSkip = () => {
    setIsError(false);
    handleNextStep();
    handleEntity(entity, 'incorrect');
  };

  return (
    <div className="">
      <div className="flex items-center gap-2 h-[42px]">
        <Repeat2 className={`${isError ? 'text-red-600' : 'text-green-600'}`} />{' '}
        <span>{entity.translate.join(', ')}</span>
        {isError && (
          <span className="text-gray text-[14px]/[18px]">
            {'('}
            {entity.en}
            {')'}
          </span>
        )}
      </div>
      <div className="my-4 w-1/3">
        <Input
          isError={isError}
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
          className="w-full"
          variant={'dark'}
          placeholder="Type translation"
        />
      </div>
      <div className="flex gap-4 w-1/3">
        <Button className="w-full" size={'sm'} onClick={handleSkip}>
          Skip
        </Button>
        {!isError && (
          <Button className="w-full" size={'sm'} onClick={handleCheckAnswer}>
            <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
};
