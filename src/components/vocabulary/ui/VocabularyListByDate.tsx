'use client';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IVocabularyItem } from '@/app/(pages)/vocabulary/model/types';
import { animations } from '@/lib/motion';

export interface IVocabularyByDate {
  [date: string]: IVocabularyItem[];
}

export const VocabularyListByDate = ({ data }: { data: IVocabularyByDate }) => {
  return (
    <>
      {Object.entries(data).map(
        ([date, vocabularies]: [string, IVocabularyItem[]], idx: number) => {
          return (
            <motion.div
              className="mb-4"
              key={date}
              {...animations.appearance(idx * 0.1)}
            >
              <div className="text-[16px] font-medium  text-grayLight mb-4">
                <div className="flex gap-2 items-center">{date}</div>
              </div>
              <div
                key={date}
                {...animations.appearance(idx * 0.1)}
                className="flex flex-wrap gap-x-2 gap-y-6 border-b border-gray pb-6"
              >
                {vocabularies.map((item, idx) => (
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
                        <TooltipContent className="bg-black rounded-2xl text-[12px] py-1 px-3">
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
};
