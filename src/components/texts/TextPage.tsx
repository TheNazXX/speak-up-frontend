'use client';

import { IText } from '@/app/(pages)/texts/model/types/text.types';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import Link from 'next/link';
import { WithHeaderState } from '@/app/hoc/WithHeaderState';
import { QuickAddVocabulary } from '@/components/vocabulary/ui/QuickAddVocabulary';
import { Toaster } from 'sonner';

const TextPage = ({ data }: { data: IText }) => {
  return (
    <>
      <div className="flex justify-center items-center border-b border-grayLight pb-4 mb-4 text-[24px]/[27px] text-white">
        <div className="flex items-center">
          <h2 className="font-bold">{data.title}</h2>
        </div>
        <Link
          href={`${DASHBOARD_PAGES.TEXTS_EDIT}/${data.title}`}
          className="py-1 px-3 text-sm rounded-md bg-primaryLight block ml-auto hover:opacity-70 transition-opacity"
        >
          Edit
        </Link>
      </div>
      <QuickAddVocabulary inputStyles="w-1/2" />
      <div
        className="editor-wrapper"
        dangerouslySetInnerHTML={{
          __html: data.content,
        }}
      ></div>
      <Toaster richColors />
    </>
  );
};

export default WithHeaderState(TextPage, 'texts');
