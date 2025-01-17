import { IWord } from '@/app/(pages)/words/model/types/word.types';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Word from './Word';
import { animations } from '@/lib/motion';

interface IWordByDate {
  [date: string]: IWord[];
}

export default function WordsList({ data }: { data: IWord[] }) {
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
                  <Calendar className="text-[#fff] w-4 h-4" />
                  {date}
                  <span className="text-green-600">[{words.length}]</span>
                </div>
              </div>
              <div
                key={date}
                {...animations.appearance(idx * 0.1)}
                className="flex flex-wrap gap-x-2 gap-y-6 mb-10 border-b border-blue-500 pb-6"
              >
                {words.map((item, idx) => (
                  <div key={item.en}>
                    <Word item={item} />
                  </div>
                ))}
              </div>
            </motion.div>
          );
        }
      )}
    </>
  );
}
