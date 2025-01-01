import { useEffect } from 'react';
import Button from '@/components/ui/button/Button';
import Textarea from '@/components/ui/textarea/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast, Toaster } from 'sonner';

const creeateSentenceForm = z.object({
  sentence: z.string().min(10, 'Sentence must be a minumim 10 symbols'),
});

type SentenceFormData = z.infer<typeof creeateSentenceForm>;

interface ISentenceFormProps {
  onAddSentence: (text: string) => void;
}

export const SentenceForm = ({ onAddSentence }: ISentenceFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SentenceFormData>({
    resolver: zodResolver(creeateSentenceForm),
  });

  useEffect(() => {
    if (Object.keys(errors).length) {
      Object.values(errors).forEach((error) => {
        toast.error(error.message);
      });
    }
  }, [errors]);

  const onCreateSentence = (data: SentenceFormData) => {
    onAddSentence(data.sentence);
    reset({ sentence: '' });
  };

  return (
    <>
      <label className="mb-3" htmlFor="translate">
        <div className="flex mb-2 gap-2 items-center">
          <div className="">Sentences:</div>
          <Button
            onClick={handleSubmit(onCreateSentence)}
            size={'zero'}
            type="button"
            className="hover:text-blue-500"
          >
            +
          </Button>
        </div>
        <Textarea
          {...register('sentence')}
          className="w-[320px] h-40"
          variant={'dark'}
          placeholder="Write the sentence"
          isError={errors.hasOwnProperty('sentence')}
        />
      </label>
    </>
  );
};
