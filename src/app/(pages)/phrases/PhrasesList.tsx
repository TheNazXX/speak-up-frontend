import { IPhrase } from './model/types/phrase.types';
import { motion } from 'framer-motion';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, RefreshCcw } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface IPhraseByDate {
  [date: string]: IPhrase[];
}
import { animations } from '@/lib/motion';
import Button from '@/components/ui/button/Button';
import Loader from '@/components/ui/loader/Loader';
import { repeatPhrasesService } from '@/app/services/repeat-pharases.service';
import { toast } from 'sonner';
import { errorCatch } from '@/app/api/error';
import { useState } from 'react';

export default function PhrasesList({ data }: { data: IPhrase[] }) {
  const { push } = useRouter();
  const [localFetchingPost, setLocalFetchingPost] = useState<string>('');

  const { mutate: postRepeatPhrases, status: postRepeatPhrasesStatus } =
    useMutation({
      mutationFn: (idx: string[]) => repeatPhrasesService.postPhrases(idx),
      onSuccess: () => {
        push(DASHBOARD_PAGES.REPEAT_PHRASES);
        setLocalFetchingPost('');
      },
      onError: (error) => {
        toast.error(errorCatch(error));
        setLocalFetchingPost('');
      },
    });

  const transformData = (data: IPhrase[]): IPhraseByDate => {
    const phrasesSortedByDate: IPhraseByDate = {};

    data.forEach((item: IPhrase) => {
      const date = format(new Date(item.createdAt), 'yyyy-MM-dd');
      if (!phrasesSortedByDate[date]) {
        phrasesSortedByDate[date] = [item];
      } else {
        phrasesSortedByDate[date].push(item);
      }
    });

    const sortedData = Object.keys(phrasesSortedByDate)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .reduce((acc: IPhraseByDate, date: string) => {
        acc[date] = phrasesSortedByDate[date];
        return acc;
      }, {});

    return sortedData;
  };

  return (
    <>
      {Object.entries(transformData(data)).map(
        ([date, phrases]: [string, IPhrase[]], idx: number) => {
          return (
            <motion.div
              className="mb-4"
              key={date}
              {...animations.appearance(idx * 0.1)}
            >
              <div className="pl-2 font-semibold text-blue-500 mb-4">
                <div className="flex gap-2 items-center">
                  {postRepeatPhrasesStatus === 'pending' &&
                  localFetchingPost === date ? (
                    <Loader className="w-5 h-5" />
                  ) : (
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      size={'sm'}
                      onClick={() => {
                        postRepeatPhrases(phrases.map((phrase) => phrase.id));
                        setLocalFetchingPost(date);
                      }}
                    >
                      <RefreshCcw className="text-[#fff] w-4 h-4" />
                    </Button>
                  )}
                  {date}
                  <span className="text-green-600">[{phrases.length}]</span>
                </div>
              </div>
              <div
                key={date}
                {...animations.appearance(idx * 0.1)}
                className="flex flex-wrap gap-x-2 gap-y-6 mb-10 border-b border-blue-500 pb-6"
              >
                {phrases.map((item, idx) => (
                  <motion.div
                    key={item.en}
                    {...animations.appearance(idx * 0.1)}
                  >
                    <Link
                      className="text-white p-2 bg-blue-600 rounded-md leading-6 hover:opacity-80 transition-opacity text-sm"
                      href={`${DASHBOARD_PAGES.PHRASES}/${item.en}`}
                    >
                      {item.en}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        }
      )}
    </>
  );
}
