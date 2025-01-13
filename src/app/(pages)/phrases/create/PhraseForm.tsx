'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster } from 'sonner';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import { SentenceForm } from '../../words/create/SentenceForm';
import { useSentences } from '@/app/hook/useSentences';
import { Sentences } from '@/components/Sentences/Sentences';
import { useMutation } from '@tanstack/react-query';
import { IPhrase, IPostPhraseDto } from '../model/types/phrase.types';
import { phrasesService } from '../model/services/phrases.service';
import { toast } from 'sonner';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { useRouter } from 'next/navigation';
import { errorCatch } from '@/app/api/error';
import Loader from '@/components/ui/loader/Loader';
import { useEffect } from 'react';

const createPhraseSchema = z.object({
  en: z
    .string()
    .min(2, 'Field en must be a minumim 2 symbols')
    .regex(/^[^\d]*$/, 'Field word must not contain numbers'),
  translate: z
    .string()
    .min(2, 'Field translate must be minimum 2 symbols')
    .regex(/^[^\d]*$/, 'Field word must not contain numbers'),
  sentences: z.array(z.string()).optional().default([]),
});

type PhraseFormData = z.infer<typeof createPhraseSchema>;

export interface ICreatePhraseFormProps {
  phrase?: IPhrase;
  mode: 'create' | 'update';
  isToaster?: boolean;
  onAddSentence?: (text: string) => void;
  onResetSentences?: () => void;
}

export const PhraseForm = ({
  phrase,
  mode,
  isToaster = true,
  onAddSentence,
  onResetSentences,
}: ICreatePhraseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm<PhraseFormData>({
    resolver: zodResolver(createPhraseSchema),
  });

  const { push } = useRouter();

  const { mutate, status } = useMutation({
    mutationFn: (data: IPostPhraseDto) =>
      mode === 'create'
        ? phrasesService.create(data)
        : phrasesService.update(phrase!.en, data),
    onSuccess: (data) => {
      mode === 'create'
        ? toast.success('Phrase was created successfully')
        : toast.success('Phrase was updated successfully');
      reset();

      if (onResetSentences && mode === 'create') {
        onResetSentences();
      }

      push(`${DASHBOARD_PAGES.PHRASES}`);
    },
    onError: (error, data) => {
      toast.error(errorCatch(error));
    },
  });

  useEffect(() => {
    if (mode === 'update' && phrase) {
      setValue('en', phrase.en);
      setValue('translate', phrase.translate.join(', '));
    }
  }, [phrase]);

  const transformPhraseToDto = (data: PhraseFormData): IPostPhraseDto => {
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

  const onSubmit = (data: PhraseFormData) => {
    mutate(transformPhraseToDto(data));
  };

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
                placeholder="Write the phrase in english"
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
          </div>
          {mode === 'create' && (
            <div className="">
              <SentenceForm
                onAddSentence={(sentence: string) => {
                  if (onAddSentence) {
                    onAddSentence(sentence);
                  }

                  setValue('sentences', [
                    ...(getValues('sentences') || []),
                    sentence,
                  ]);
                }}
              />
            </div>
          )}
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
};
