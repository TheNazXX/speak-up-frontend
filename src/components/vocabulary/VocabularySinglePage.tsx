'use client';

import { IVocabularyItem } from '@/src/app/(pages)/vocabulary/model/types';
import { Pen, Scroll, Settings, Trash } from 'lucide-react';
import Button from '../ui/button/Button';
import { useRouter } from 'next/navigation';
import { DASHBOARD_PAGES } from '@/src/config/pages-url.config';
import { format } from 'date-fns';

export const VocabularySinglePage = ({ data }: { data: IVocabularyItem }) => {
  const router = useRouter();

  return (
    <div className="md:w-1/2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Scroll />
          <h2 className="text-xl">{data.en}</h2>
          <span className="text-sm text-gray">
            {'('}
            {data.partOfSpeech?.name || 'Unknown'}
            {')'}
          </span>
        </div>

        <div className="gap-2 hidden md:flex">
          <Button
            onClick={() => {
              router.replace(
                `${DASHBOARD_PAGES.VOCABULARY_EDIT}/${data.en}`,
                {}
              );
              router.refresh();
            }}
            className="flex items-center gap-1.5 pl-2"
          >
            <Settings className="w-4 h-4" />
            <span className="leading-4">Edit</span>
          </Button>
          <Button variant={'danger'} className="flex items-center gap-1.5 pl-2">
            <Trash className="w-4 h-4" />
            <span className="leading-4">Delete</span>
          </Button>
        </div>
      </div>

      <hr className="bg-grayLight my-4" />

      <div>
        <ul className="pl-5 list-disc text-[#fff] text-lg">
          {data?.translate.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="text-sm mt-4">
        <div>
          <span className="text-[15px] text-gray">Created at - </span>
          <span className="text-green-600 font-medium">
            {format(new Date(data.createdAt), 'dd MMM yyyy')}
          </span>
        </div>
        <div>
          <span className="text-[15px] text-gray">Repeated at - </span>
          <span className="text-green-600 font-medium">
            {format(new Date(data.repeatedAt), 'dd MMM yyyy')}
          </span>
        </div>
      </div>

      <div className="gap-2 md:hidden flex mt-4">
        <Button
          onClick={() => {
            router.replace(`${DASHBOARD_PAGES.VOCABULARY_EDIT}/${data.en}`, {});
            router.refresh();
          }}
          className="flex items-center gap-1.5 pl-2"
        >
          <Settings className="w-4 h-4" />
          <span className="leading-4">Edit</span>
        </Button>
        <Button variant={'danger'} className="flex items-center gap-1.5 pl-2">
          <Trash className="w-4 h-4" />
          <span className="leading-4">Delete</span>
        </Button>
      </div>
    </div>
  );
};
