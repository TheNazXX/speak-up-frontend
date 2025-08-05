'use client';

import { DASHBOARD_PAGES } from '@/src/config/pages-url.config';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IVocabularyItem } from '@/src/app/(pages)/vocabulary/model/types';
import { animations } from '@/src/lib/motion';

interface IVocabularyListProps {
  isInteractive?: boolean;
  data: IVocabularyItem[];
  className?: string;
}

export const VocabularyList = ({
  data,
  isInteractive = true,
  className = '',
}: IVocabularyListProps) => {
  return (
    <div className={`flex flex-wrap gap-x-2 gap-y-6 md:gap-y-4 ${className}`}>
      {data.map((item, idx) => (
        <motion.div key={item.en} {...animations.appearance(idx * 0.1)}>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                {isInteractive ? (
                  <Link
                    className="text-white px-2.5 py-1.5 bg-primary border border-gray rounded-xl leading-4 hover:opacity-60 transition-opacity text-[15px] relative whitespace-nowrapm"
                    href={`${DASHBOARD_PAGES.VOCABULARY}/${item.en}`}
                  >
                    {item.en}
                  </Link>
                ) : (
                  <span className='className="text-white px-2.5 py-1.5 bg-primary border border-gray rounded-xl leading-4 hover:opacity-60 transition-opacity text-[15px] relative whitespace-nowrapm"'>
                    {' '}
                    {item.en}
                  </span>
                )}
              </TooltipTrigger>
              <TooltipContent className="bg-black rounded-2xl text-[12px] py-1 px-3">
                <p>{item.translate?.join(', ')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      ))}
    </div>
  );
};
