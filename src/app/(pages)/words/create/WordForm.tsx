'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { wordsService } from '@/app/(pages)/words/model/services/words.service';
import {
  IWord,
  IWordPostDto,
} from '@/app/(pages)/words/model/types/word.types';
import { useMutation } from '@tanstack/react-query';
import { errorCatch } from '@/app/api/error';
import Loader from '@/components/ui/loader/Loader';
import Select, { SelectOption } from '@/components/ui/select/select';
import { SentenceForm } from './SentenceForm';

const partOfSpeech: SelectOption[] = [
  {
    label: 'Unknown',
    value: 'unknown',
  },
  {
    label: 'Verb',
    value: 'verb',
  },
  {
    label: 'Noun',
    value: 'noun',
  },
];

const createWordSchema = z.object({
  en: z
    .string()
    .min(2, 'Field word must be a minumim 2 symbols')
    .regex(/^[^\d]*$/, 'Field word must not contain numbers'),
  translate: z
    .string()
    .min(2, 'Field translate must be minimum 2 symbols')
    .regex(/^[^\d]*$/, 'Field word must not contain numbers'),
  partOfSpeech: z.string().default('unknow'),
  sentences: z.array(z.string()).optional().default([]),
});

type FormData = z.infer<typeof createWordSchema>;

export type WordFormMode = 'create' | 'update';

export interface IWordFromProps {
  en?: string;
  word?: IWord | null;
  partOfSpeech?: string;
  mode?: WordFormMode;
  isToaster?: boolean;
  onSuccessCallback?: (data: IWord) => void;
  onErrorCallback?: (data: IWordPostDto, error?: string) => void;
  onAddSentence: (sentence: string) => void;
  onResetSentences: () => void;
}

export default function WordForm({
  en,
  word,
  mode = 'create',
  isToaster = true,
  onSuccessCallback,
  onErrorCallback,
  onAddSentence,
  onResetSentences,
}: IWordFromProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(createWordSchema),
  });

  const { mutate, status } = useMutation({
    mutationFn: (data: IWordPostDto) =>
      mode === 'create'
        ? wordsService.create({ ...data })
        : wordsService.update(word!.id, data),
    onSuccess: (data) => {
      mode === 'create'
        ? toast.success('Word was created successfully')
        : toast.success('Word was updated successfully');
      reset();
      onResetSentences();

      if (onSuccessCallback) {
        onSuccessCallback(data.data!);
      }
    },
    onError: (error, data) => {
      toast.error(errorCatch(error));

      if (onErrorCallback) {
        onErrorCallback(data);
      }
    },
  });

  const transformWordToDto = (data: FormData): IWordPostDto => {
    return {
      ...data,
      translate: [
        ...new Set(
          data.translate
            .split(',')
            .map((item) => item.trim())
            .filter((item) => item)
        ),
      ],
    };
  };

  const onSubmit = (data: FormData) => {
    mutate(transformWordToDto(data));
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      Object.values(errors).forEach((error) => {
        toast.error(error.message);
      });
    }
  }, [errors]);

  useEffect(() => {
    if (word) {
      setValue('en', word.en);
      setValue('translate', word.translate.join(', '));
      setValue('partOfSpeech', word.partOfSpeech.name);
    }

    if (en) {
      setValue('en', en);
    }
  }, [word, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="px-layout relative">
        <div className="flex gap-10">
          <div className="flex flex-col gap-3">
            <label className="mb-3" htmlFor="word">
              <div className="mb-2">Word:</div>
              <Input
                className="w-80"
                {...register('en')}
                variant={'dark'}
                placeholder="Write the word in english"
                isError={errors.hasOwnProperty('en')}
              />
            </label>
            <label className="mb-3" htmlFor="translate">
              <div className="mb-2">Translate:</div>
              <Input
                className="w-80"
                {...register('translate')}
                variant={'dark'}
                placeholder="Write the translate"
                isError={errors.hasOwnProperty('translate')}
              />
            </label>
            <label className="mb-3" htmlFor="word">
              <div className="mb-2">Part of speech:</div>

              <Select
                isError={errors.hasOwnProperty('partOfSpeech')}
                variant={'dark'}
                {...register('partOfSpeech')}
                options={partOfSpeech}
              />
            </label>
          </div>
          <div className="">
            <SentenceForm
              onAddSentence={(sentence: string) => {
                onAddSentence(sentence);
                setValue('sentences', [
                  ...(getValues('sentences') || []),
                  sentence,
                ]);
              }}
            />
          </div>
        </div>

        <div className="absolute top-0 right-6 flex justify-end mt-6 ml-auto">
          {status === 'pending' ? (
            <Loader />
          ) : mode === 'create' ? (
            <Button>+ Create</Button>
          ) : (
            <Button>Update</Button>
          )}
        </div>
      </form>

      {isToaster && <Toaster expand={true} richColors />}
    </>
  );
}
