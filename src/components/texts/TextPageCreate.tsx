'use client';

import { textService } from '@/src/app/services/texts.service';
import TextEditor from '@/src/components/ui/text-editor/TextEditor';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Button from '@/src/components/ui/button/Button';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster, toast } from 'sonner';
import Input from '@/src/components/ui/input/Input';
import { z } from 'zod';
import { LetterText } from 'lucide-react';
import { IText } from '@/src/app/(pages)/texts/model/types/text.types';
import { useRouter } from 'next/navigation';
import { IResponse } from '@/src/app/types/root.types';
import { DASHBOARD_PAGES } from '@/src/config/pages-url.config';

const LOCAL_TEXT_CONTENT_KEY = 'text_content';

const createTextSchema = z.object({
  title: z.string().min(3, 'Minimum 3 symbols'),
  content: z.string().optional(),
});

interface TextCreateProps {
  mode: 'create' | 'edit';
  data?: IText;
}

export type IPostText = z.infer<typeof createTextSchema>;

export default function TextsCreate({
  mode = 'create',
  data,
}: TextCreateProps) {
  const router = useRouter();

  const methods = useForm<IPostText>({
    resolver: zodResolver(createTextSchema),
    defaultValues: {
      title: mode === 'edit' && data ? data.title : '',
      content: mode === 'edit' && data ? data.content : '',
    },
  });

  const { register, handleSubmit, setValue, watch, control } = methods;
  const contentValue = watch('content');

  const { mutate: createMutate, status: createStatus } = useMutation({
    mutationKey: ['/text/create'],
    mutationFn: (data: IPostText) => textService.create(data),
    onSuccess: () => {
      localStorage.removeItem(LOCAL_TEXT_CONTENT_KEY);
      methods.reset();
      toast.success('Text created successfully');
    },
  });

  const { mutate: updateMutate, status: updateStatus } = useMutation({
    mutationKey: ['/text/update'],
    mutationFn: (data: IPostText & { id: string }) =>
      textService.update(data.id, { title: data.title, content: data.content }),
    onSuccess: ({ data }: IResponse<IText>) => {
      localStorage.removeItem(LOCAL_TEXT_CONTENT_KEY);
      toast.success('Text updated successfully');
      router.push(`${DASHBOARD_PAGES.TEXTS}/${data?.title}`);
    },
  });

  useEffect(() => {
    if (mode === 'create') {
      const savedContent = localStorage.getItem(LOCAL_TEXT_CONTENT_KEY);
      if (savedContent) {
        setValue('content', savedContent);
      }
    }
  }, [mode, setValue]);

  const onChangeContent = (content: string) => {
    setValue('content', content);
    if (mode === 'create') {
      localStorage.setItem(LOCAL_TEXT_CONTENT_KEY, content);
    }
  };

  const onSubmit = (formData: IPostText) => {
    if (mode === 'edit' && data) {
      updateMutate({ ...formData, id: data.id });
    } else {
      createMutate(formData);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4 items-center mb-8">
            <LetterText className="" />
            <Input
              {...register('title')}
              variant={'dark'}
              placeholder="Title"
              isError={!!methods.formState.errors.title}
              className="w-full"
            />
            <Button className="ml-auto" type="submit">
              {mode === 'edit' ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>

        <div className="editor-wrapper">
          <TextEditor
            onChange={onChangeContent}
            initialValue={contentValue || ''}
          />
        </div>
      </div>

      <Toaster expand richColors />
    </FormProvider>
  );
}
