'use client';

import { IText } from '@/app/(pages)/texts/model/types/text.types';
import { CornerUpRight } from 'lucide-react';
import Link from 'next/link';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { WithHeaderState } from '@/app/hoc/WithHeaderState';
import Button from '@/components/ui/button/Button';
import { truncateString } from '@/lib/utils';

const TextsPage = ({ data }: { data: IText[] }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {data.map((item) => {
        return (
          <div
            key={item.title}
            className="group border border-gray rounded-lg py-2 w-60 bg-black overflow-hidden flex flex-col relative"
          >
            <div className="border-b border-gray px-2 pb-2 text-center mb-3">
              {item.title}
            </div>

            <div className="px-2 relative">
              <div
                className="text-[12px]/[15px] overflow-hidden mb-4 text-grayLight h-[65px]"
                dangerouslySetInnerHTML={{
                  __html: item.content,
                }}
              ></div>
              <Link
                className="text-[14px] bg-primaryLight p-1 ml-auto block text-center rounded-md"
                href={`${DASHBOARD_PAGES.TEXTS}/${item.title}`}
              >
                Read more
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WithHeaderState(TextsPage, 'texts');
