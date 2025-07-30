import { IPhrase } from './model/types/phrase.types';
import { motion } from 'framer-motion';
import { DASHBOARD_PAGES } from '@/src/config/pages-url.config';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, RefreshCcw } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface IPhraseByDate {
  [date: string]: IPhrase[];
}
import { animations } from '@/src/lib/motion';
import Button from '@/src/components/ui/button/Button';
import Loader from '@/src/components/ui/loader/Loader';
import { repeatPhrasesService } from '@/src/app/services/repeat-pharases.service';
import { toast } from 'sonner';
import { errorCatch } from '@/src/app/api/error';
import { useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/src/components/ui/tooltip';

export default function PhrasesList({ data }: { data: IPhrase[] }) {
  const { push } = useRouter();
  const [localFetchingPost, setLocalFetchingPost] = useState<string>('');

  const { mutate: postRepeatPhrases, status: postRepeatPhrasesStatus } =
    useMutation({
      mutationFn: (idx: string[]) => repeatPhrasesService.postPhrases(idx),
      onSuccess: () => {
        // push(DASHBOARD_PAGES.REPEAT_PHRASES);
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
              <div className="text-[16px] font-medium  text-grayLight mb-4">
                <div className="flex gap-2 items-center">
                  {postRepeatPhrasesStatus === 'pending' &&
                  localFetchingPost === date ? (
                    <Loader className="w-5 h-5" />
                  ) : (
                    <Button
                      className="bg-primary hover:bg-primaryLight transition-al"
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
                </div>
              </div>
              <div
                key={date}
                {...animations.appearance(idx * 0.1)}
                className="flex flex-wrap gap-x-2 gap-y-6 border-b border-gray pb-6"
              >
                {phrases.map((item, idx) => (
                  <motion.div
                    key={item.en}
                    {...animations.appearance(idx * 0.1)}
                  >
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link
                            className="text-white px-2.5 py-1.5 bg-primary border border-gray rounded-xl leading-4 hover:opacity-60 transition-opacity text-[15px] relative whitespace-nowrapm"
                            href={`${DASHBOARD_PAGES.PHRASES}/${item.en}`}
                          >
                            {item.en}
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent className="bg-black rounded-2xl text-[12px]">
                          <p>
                            <p>{item.translate?.join(', ')}</p>
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
