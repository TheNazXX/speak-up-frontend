'use client';

import { wordsService } from '@/app/(pages)/words/model/services/words.service';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Loader from '@/components/ui/loader/Loader';
import Button from '@/components/ui/button/Button';
import { Edit, Trash2 } from 'lucide-react';
import Error from '@/components/ui/error/Error';
import { errorCatch } from '@/app/api/error';
import { toast, Toaster } from 'sonner';
import { IWord } from '../model/types/word.types';
import { useRouter } from 'next/navigation';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { WithHeaderState } from '@/app/hoc/WithHeaderState';
import Link from 'next/link';
import { Sentences } from '@/components/Sentences/Sentences';
import { ISentence } from '../model/types/sentence.types';

function WordSingle({ slug }: { slug: string }) {
  const [localWordData, setLocalWordData] = useState<null | IWord>(null);
  const { replace, push } = useRouter();

  const { data, isFetching, error } = useQuery({
    queryKey: ['/words/:en'],
    queryFn: () => wordsService.get(slug),
    retry: 1,
    staleTime: 0,
  });

  const { mutate, status } = useMutation({
    mutationFn: (en: string) => wordsService.deleteByEn(en),
    onSuccess: () => {
      toast.success('Word deleted successfully');
      push(DASHBOARD_PAGES.WORDS);
    },
    onError: (error: unknown) => {
      toast.error(errorCatch(error));
    },
  });

  const onHandleDelete = (en: string) => {
    mutate(en);
  };

  useEffect(() => {
    if (!(error || isFetching) && data?.data) {
      setLocalWordData(data.data);
      toast.success('Word was found');
    }
  }, [data, isFetching]);

  return (
    <>
      {error && (
        <div className="absolute top-1/2 left-1/2">
          <Error message={errorCatch(error)} />
        </div>
      )}

      {!error && (
        <>
          <div className="pb-2 border-b border-blue-600 flex justify-between">
            {isFetching || status === 'pending' ? (
              <div className="mb-1">
                <Loader />
              </div>
            ) : (
              <span className="text-blue-500 text-2xl">
                {localWordData?.en}
              </span>
            )}
            <div className="flex gap-2">
              <Link
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none h-10 px-4 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700"
                href={`${DASHBOARD_PAGES.WORDS_EDIT}/${localWordData?.en}`}
              >
                <Edit />
              </Link>

              <Button
                onClick={() => {
                  onHandleDelete(localWordData!.en);
                }}
                variant={'danger'}
                disabled={isFetching}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <span className="mb-2 block">Translate:</span>
            {isFetching || status === 'pending' ? (
              <Loader />
            ) : (
              <ul className="pl-5 list-disc">
                {localWordData?.translate.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-10 mb-4 flex items-center gap-3">
            <div className="">Sentences:</div>
            <Link
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none h-8 px-2 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700"
              href={`${DASHBOARD_PAGES.WORDS_EDIT}/${localWordData?.en}`}
            >
              Add
            </Link>
          </div>
          {isFetching ? (
            <Loader />
          ) : !!localWordData?.sentences.length ? (
            <Sentences
              targetWord={localWordData.en}
              sentences={localWordData?.sentences.map(
                (sentence: ISentence) => sentence.text
              )}
            />
          ) : (
            <span className="text-[14px]">No sentences yet</span>
          )}
          <Toaster richColors expand={true} />
        </>
      )}
    </>
  );
}

export default WithHeaderState(WordSingle, 'words');
