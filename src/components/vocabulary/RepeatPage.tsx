'use client';

import { WithHeaderState } from '@/src/app/hoc/WithHeaderState';
import { DASHBOARD_PAGES } from '@/src/config/pages-url.config';
import clsx from 'clsx';
import { format, isToday } from 'date-fns';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface IRepeatPageProsp {
  createdVocabularyDates: string[];
  repeatedVocabularyDates: string[];
}

const RepeatPage = ({
  createdVocabularyDates,
  repeatedVocabularyDates,
}: IRepeatPageProsp) => {
  const searchParams = useSearchParams();
  const activeType = searchParams.get('type');

  const refresh = () => {
    useRouter().refresh();
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex gap-2 items-center">
          <Clock className="text-grayLight" />
          <h5>Created date</h5>
        </div>

        <div className="flex gap-2 flex-wrap mt-4">
          {createdVocabularyDates.map((date: string) => {
            return (
              <Link
                key={date}
                className={clsx(
                  'text-white px-2.5 py-1.5 bg-primary border border-gray rounded-xl leading-4 hover:opacity-60 transition-opacity text-[12px] font-medium relative whitespace-nowrapm',
                  isToday(new Date(date)) && 'border-green-600'
                )}
                href={`${DASHBOARD_PAGES.VOCABULARY_REPEAT_SESSION}?createdAt=${date}&type=${activeType}`}
              >
                {format(new Date(date), 'dd MMM yyyy ')}
              </Link>
            );
          })}
        </div>

        <hr className="mt-4 text-grayLight" />
      </div>

      <div>
        <div className="flex gap-2 items-center">
          <Clock className="text-grayLight" />
          <h5>Last repeated date</h5>
        </div>

        <div className="flex gap-2 flex-wrap mt-4">
          {repeatedVocabularyDates.map((date: string) => {
            return (
              <Link
                key={date}
                className={clsx(
                  'text-white px-2.5 py-1.5 bg-primary border border-gray rounded-xl leading-4 hover:opacity-60 transition-opacity text-[12px] font-medium relative whitespace-nowrapm',
                  isToday(new Date(date)) && 'border-green-600'
                )}
                href={`${DASHBOARD_PAGES.VOCABULARY_REPEAT_SESSION}?repeatedAt=${date}&type=${activeType}`}
                onClick={refresh}
              >
                {format(new Date(date), 'dd MMM yyyy')}
              </Link>
            );
          })}
        </div>

        <hr className="mt-4 text-grayLight" />
      </div>
    </>
  );
};

export default WithHeaderState(RepeatPage, 'vocabulary-repeat');
