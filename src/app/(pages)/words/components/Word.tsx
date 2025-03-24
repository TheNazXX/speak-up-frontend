import { IWord } from '@/app/(pages)/words/model/types/word.types';
import { IRepeatWord } from '@/app/types/repeat-words';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import Link from 'next/link';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Word({ item }: { item: IWord | IRepeatWord }) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          {' '}
          <Link
            className="text-white px-2.5 py-1.5 bg-primary border border-gray rounded-xl leading-4 hover:opacity-60 transition-opacity text-[15px] relative whitespace-nowrap"
            href={`${DASHBOARD_PAGES.WORDS}/${item.en}`}
          >
            {item.en}
          </Link>
        </TooltipTrigger>
        <TooltipContent className="bg-black rounded-2xl text-[12px]">
          <p>
            <p>{(item as IWord).translate?.join(', ') || ''}</p>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
