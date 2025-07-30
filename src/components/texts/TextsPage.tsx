'use client';

import { IText } from '@/src/app/(pages)/texts/model/types/text.types';
import Link from 'next/link';
import { DASHBOARD_PAGES } from '@/src/config/pages-url.config';
import { WithHeaderState } from '@/src/app/hoc/WithHeaderState';

const TextsPage = ({ data }: { data: IText[] }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {data.map((item) => {
        return (
          <div
            key={item.title}
            className="group border border-gray rounded-lg py-2 w-60 bg-black overflow-hidden flex flex-col relative"
          >
            <div className="flex gap-2 border-b border-gray px-2 pb-2 mb-3">
              <h4 className="text-[16px]/[19px]">{item.title}</h4>
            </div>
            <div className="px-2 relative">
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
