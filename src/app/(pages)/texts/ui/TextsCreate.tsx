'use client';

import { textService } from '@/app/services/texts.service';
import TextEditor from '@/components/ui/text-editor/TextEditor';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/button/Button';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster, toast } from 'sonner';
import Input from '@/components/ui/input/Input';
import { z } from 'zod';
import { LetterText } from 'lucide-react';
import { extractUnknownWords } from '../libs';

const LOCAL_TEXT_CONTENT_KEY = 'text_content';

const wordItemSchema = z.object({
  en: z.string(),
  translate: z.string().min(1, 'Translation is required'),
  type: z.enum(['word', 'phrase']),
});

const createTextSchema = z.object({
  name: z.string().min(3, 'Minimum 3 symbols'),
  content: z.string().optional(),
  unknowWords: z.array(wordItemSchema),
});

export type IPostText = z.infer<typeof createTextSchema>;

export default function TextsCreate() {
  const [content, setContent] = useState<string>('');

  const methods = useForm<IPostText>({
    resolver: zodResolver(createTextSchema),
    defaultValues: {
      unknowWords: [],
    },
  });

  const { register, handleSubmit, setValue, getValues, watch } = methods;

  const { mutate, status } = useMutation({
    mutationKey: ['/text/create'],
    mutationFn: (data: IPostText) => textService.create(data),
    onSuccess: (data) => {
      localStorage.removeItem(LOCAL_TEXT_CONTENT_KEY);
      setContent('');
      methods.reset();
      toast.success('Text created successfully');
    },
  });

  useEffect(() => {
    const savedContent = localStorage.getItem(LOCAL_TEXT_CONTENT_KEY);
    if (savedContent) {
      setContent(savedContent);
      updateFormWithContent(savedContent);
    }
  }, []);

  const updateFormWithContent = (content: string) => {
    setValue('content', content);
    const words = extractUnknownWords(content);
    setValue(
      'unknowWords',
      words.map((word) => ({
        en: word,
        translate: '',
        type: 'word',
      }))
    );
  };

  const onChangeContent = (content: string) => {
    setContent(content);
    localStorage.setItem(LOCAL_TEXT_CONTENT_KEY, content);
    updateFormWithContent(content);
  };

  const onSubmit = (data: IPostText) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 items-center mb-8">
            <LetterText className="" />
            <Input
              {...register('name')}
              variant={'dark'}
              placeholder="Title"
              isError={!!methods.formState.errors.name}
              className="max-w-48"
            />
            <Button className="ml-auto" type="submit">
              Create text
            </Button>
          </div>
        </form>

        <TextEditor onChange={onChangeContent} initialValue={content} />
      </div>

      <hr className="my-8 text-primaryLight" />

      <ul
        className="list-disc w-1/2 border-r-primary border-r pr-4"
        key={content}
      >
        {watch('unknowWords')?.map((word, index) => (
          <UnknowWordsItem key={index} word={word} index={index} />
        ))}
      </ul>

      <Toaster expand richColors />
    </FormProvider>
  );
}

type UnknowWordsItemProps = z.infer<typeof wordItemSchema>;

const UnknowWordsItem = ({
  word,
  index,
}: {
  word: UnknowWordsItemProps;
  index: number;
}) => {
  const { register, setValue, watch } = useFormContext<IPostText>();
  const currentWord = watch(`unknowWords.${index}`);

  return (
    <li className="flex gap-2 items-center mb-4">
      <span className="mr-auto">{word.en}</span>
      <Input
        variant={'dark'}
        placeholder="Translate"
        {...register(`unknowWords.${index}.translate`)}
      />
      <div className="">|</div>
      <Button
        disabled={currentWord?.type === 'word'}
        onClick={() => setValue(`unknowWords.${index}.type`, 'word')}
      >
        Word
      </Button>
      <Button
        disabled={currentWord?.type === 'phrase'}
        onClick={() => setValue(`unknowWords.${index}.type`, 'phrase')}
      >
        Phrase
      </Button>
    </li>
  );
};
