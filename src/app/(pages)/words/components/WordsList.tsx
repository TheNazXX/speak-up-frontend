import { IWord } from '@/app/(pages)/words/model/types/word.types';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Word from './Word';
import { animations } from '@/lib/motion';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState } from 'react';
import { repeatWordsService } from '@/app/services/repeat-words.service';
import { useRouter } from 'next/navigation';
import { errorCatch } from '@/app/api/error';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import Button from '@/components/ui/button/Button';
import Loader from '@/components/ui/loader/Loader';
import { RefreshCcw } from 'lucide-react';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { useDroppable } from '@dnd-kit/react';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';
import { WordsListRow } from './WordsListRow';

interface IWordByDate {
  [date: string]: IWord[];
}

export default function WordsList({ data }: { data: IWord[] }) {
  const [localFetchingPost, setLocalFetchingPost] = useState<string>('');

  const { mutate: postRepeatWords, status: postRepeatWordsStatus } =
    useMutation({
      mutationFn: (idx: string[]) => repeatWordsService.postWords(idx),
      onSuccess: () => {
        // push(DASHBOARD_PAGES.REPEAT_WORDS);
        setLocalFetchingPost('');
      },
      onError: (error) => {
        toast.error(errorCatch(error));
        setLocalFetchingPost('');
      },
    });

  const transformData = (data: IWord[]): IWordByDate => {
    const wordsSortedByDate: IWordByDate = {};

    data.forEach((item: IWord) => {
      const date = format(new Date(item.createdAt), 'yyyy-MM-dd');
      if (!wordsSortedByDate[date]) {
        wordsSortedByDate[date] = [item];
      } else {
        wordsSortedByDate[date].push(item);
      }
    });

    const sortedData = Object.keys(wordsSortedByDate)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .reduce((acc: IWordByDate, date: string) => {
        acc[date] = wordsSortedByDate[date];
        return acc;
      }, {});

    return sortedData;
  };

  return (
    <>
      {Object.entries(transformData(data)).map(
        ([date, words]: [string, IWord[]], idx: number) => {
          return (
            <motion.div
              className="mb-4"
              key={date}
              {...animations.appearance(idx * 0.1)}
            >
              <div className="pl-2 font-semibold text-blue-500 mb-4">
                <div className="flex gap-2 items-center">
                  {postRepeatWordsStatus === 'pending' &&
                  localFetchingPost === date ? (
                    <Loader className="w-5 h-5" />
                  ) : (
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      size={'sm'}
                      onClick={() => {
                        postRepeatWords(words.map((word) => word.id));
                        setLocalFetchingPost(date);
                      }}
                    >
                      <RefreshCcw className="text-[#fff] w-4 h-4" />
                    </Button>
                  )}
                  {date}
                  <span className="text-green-600">[{words.length}]</span>
                </div>
              </div>
              <div
                key={date}
                {...animations.appearance(idx * 0.1)}
                className="flex flex-wrap gap-x-2 gap-y-6 mb-10 border-b border-blue-500 pb-6"
              >
                <WordsListRow words={words} />
                {/* {words.map((item, idx) => (
                  // <div key={item.en}>
                  //   <Word item={item} />
                  // </div>

                 
                ))} */}
              </div>
            </motion.div>
          );
        }
      )}
    </>
  );
}
