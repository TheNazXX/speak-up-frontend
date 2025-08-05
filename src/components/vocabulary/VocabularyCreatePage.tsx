'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '../ui/input/Input';
import Select, { SelectOption } from '../ui/select/select';
import Button from '../ui/button/Button';
import { Check, Pen } from 'lucide-react';
import {
  IVocabularyItem,
  IVocabularyPostDto,
} from '@/src/app/(pages)/vocabulary/model/types';
import { useMutation } from '@tanstack/react-query';
import { vocabularyService } from '@/src/app/services/vocabulary/vocabulary.service';
import { toast, Toaster } from 'sonner';
import { errorCatch } from '@/src/app/api/error';
import Checkbox from '../ui/checkbox/Checkbox';
import { useRouter } from 'next/navigation';
import { DASHBOARD_PAGES } from '@/src/config/pages-url.config';

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
  {
    label: 'Adjective',
    value: 'adjective',
  },
];

const createVocabularySchema = z.object({
  en: z
    .string()
    .min(2, 'Field word must be a minumim 2 symbols')
    .regex(/^[^\d]*$/, 'Field word must not contain numbers'),
  translate: z
    .string()
    .min(2, 'Field translate must be minimum 2 symbols')
    .regex(/^[^\d]*$/, 'Field word must not contain numbers'),
  type: z.enum(['word', 'phrase']),
  partOfSpeech: z.string().nullable().default(null),
  isDifficult: z.boolean().default(false),
  sentences: z.array(z.string()).optional().default([]),
});

type FormData = z.infer<typeof createVocabularySchema>;

export const VocabularyCreatePage = ({
  defaultData,
  mode = 'create',
}: {
  defaultData?: IVocabularyItem;
  mode: 'create' | 'edit';
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(createVocabularySchema),
    defaultValues: {
      type: 'word',
      ...(mode === 'edit' &&
        defaultData && {
          en: defaultData.en,
          translate: defaultData.translate.join(', '),
          type: defaultData.type,
          partOfSpeech: defaultData.partOfSpeech.name,
          isDifficult: defaultData.isDifficult,
        }),
    },
  });

  const { mutate, status } = useMutation({
    mutationFn: (data: IVocabularyPostDto) =>
      mode === 'create'
        ? vocabularyService.create(data)
        : vocabularyService.update(defaultData!.en, data),
    onSuccess: (data) => {
      mode === 'create'
        ? toast.success('Vocabulary was created successfully')
        : toast.success('Vocabulary was updated successfully');

      router.replace(`${DASHBOARD_PAGES.VOCABULARY}/${data.data?.en}`);
      router.refresh();
    },
    onError: (error, data) => {
      toast.error(errorCatch(error));
    },
  });

  const type = watch('type');
  const isDifficult = watch('isDifficult');

  const transformVocabularyToDto = (data: FormData): IVocabularyPostDto => {
    return {
      ...data,
      en: data.en.trim(),
      translate: [
        ...new Set(
          data.translate
            .split(',')
            .map((item) => item.trim())
            .filter((item) => item)
        ),
      ],
      partOfSpeech: data.partOfSpeech,
      lessonId: null,
      sentences: [],
    };
  };

  const handleCreateVocabulary = (data: FormData) => {
    mutate(transformVocabularyToDto(data));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCreateVocabulary)}
        className="px-layout relative"
      >
        <div className="flex gap-10">
          <div className="w-full flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center ">
                <Pen className="w-4 h-4" />
                <h4 className="text-xl">Vocabulary</h4>
              </div>
              <div className="flex gap-1">
                <Button
                  onClick={() => setValue('type', 'word')}
                  type="button"
                  disabled={type === 'word'}
                  className=""
                >
                  Word
                </Button>
                <Button
                  onClick={() => setValue('type', 'phrase')}
                  type="button"
                  disabled={type === 'phrase'}
                  className=""
                >
                  Phrase
                </Button>
              </div>
            </div>
            <hr className="bg-gray my-4" />

            <Input
              className="md:w-96 mb-3"
              {...register('en')}
              variant={'dark'}
              placeholder="Your vocabulary"
              isError={errors.hasOwnProperty('en')}
            />

            <Input
              className="md:w-96 mb-3"
              {...register('translate')}
              variant={'dark'}
              placeholder="Write the translate"
              isError={errors.hasOwnProperty('translate')}
            />
            <Select
              className="mb-3 md:w-96"
              isError={errors.hasOwnProperty('partOfSpeech')}
              variant={'dark'}
              {...register('partOfSpeech')}
              options={partOfSpeech}
            />

            <Checkbox
              id={'difficult'}
              label="Is difficult"
              isChecked={isDifficult}
              onChange={(e) => {
                setValue('isDifficult', e.target.checked);
              }}
            />

            <Button className="md:w-96" type="submit">
              {mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </div>
        </div>
      </form>
      <Toaster richColors />{' '}
    </>
  );
};
