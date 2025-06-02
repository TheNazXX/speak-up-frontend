import {
  IVocabularyPostDto,
  IVocabularyType,
} from '@/app/(pages)/vocabulary/model/types';
import { vocabularyService } from '@/app/services/vocabulary/vocabulary.service';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import { useMutation } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface QuickAddVocabularyProps {
  inputStyles?: string;
  className?: string;
}

export const QuickAddVocabulary = ({
  inputStyles,
  className,
}: QuickAddVocabularyProps) => {
  const [vocabularlyWithTranslation, setVocabularlyWithTranslation] =
    useState<string>('');
  const [vocabularyType, setVocabularlyType] =
    useState<IVocabularyType>('word');

  const onHandleAddVocabularly = () => {
    const normalizeData: [string, string[]] = [
      vocabularlyWithTranslation.split('-')[0],
      vocabularlyWithTranslation
        .split('-')[1]
        .split(',')
        .map((item) => item.trim()),
    ];

    const preparedData: IVocabularyPostDto = {
      en: normalizeData[0],
      translate: normalizeData[1],
      partOfSpeech: null,
      type: vocabularyType,
      sentences: [],
      lessonId: null,
    };

    createVocabularyMutation(preparedData);
  };

  const reset = () => {
    setVocabularlyWithTranslation('');
    setVocabularlyType('word');
  };

  const { mutate: createVocabularyMutation, status } = useMutation({
    mutationFn: (data: IVocabularyPostDto) =>
      vocabularyService.createVocabulary(data),
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
    },
    onError: (error, data) => {},
  });

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Input
        placeholder="Quick adding vocabulary"
        className={`${inputStyles}`}
        variant={'dark'}
        onChange={(value) =>
          setVocabularlyWithTranslation(value.currentTarget.value)
        }
        value={vocabularlyWithTranslation}
      />
      <Button
        size={'md'}
        onClick={onHandleAddVocabularly}
        disabled={
          vocabularlyWithTranslation.split('-')[0].trim() === '' ||
          vocabularlyWithTranslation.split('-')[1].split(',')[0].trim() === ''
        }
      >
        <Plus />
      </Button>
      <Button
        disabled={vocabularyType === 'word'}
        size={'md'}
        onClick={() => setVocabularlyType('word')}
      >
        Word
      </Button>
      <Button
        size={'md'}
        disabled={vocabularyType === 'phrase'}
        onClick={() => setVocabularlyType('phrase')}
      >
        Phrase
      </Button>
    </div>
  );
};
