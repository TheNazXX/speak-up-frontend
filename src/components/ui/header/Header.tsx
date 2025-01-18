'use client';

import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import Locations from '../locations/Locations';
import { Plus, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { getHeaderState } from '@/app/store/headerSlice/headerSelectors';
import { HeaderPageState } from '@/app/store/headerSlice/headerSlice';
import Button from '../button/Button';

export default function Header({ children }: PropsWithChildren) {
  const header: HeaderPageState = useSelector(getHeaderState);

  let content;

  switch (header) {
    case 'words': {
      content = (
        <div className="flex items-center gap-2">
          <Link
            className="px-2 py-1 bg-blue-600 flex gap-1 items-center rounded-md hover:opacity-80 transition-opacity"
            href={DASHBOARD_PAGES.WORDS_CREATE}
          >
            <Plus />
          </Link>
          <Link
            className="px-2 py-1 bg-blue-600 flex gap-1 items-center rounded-md hover:opacity-80 transition-opacity"
            href={DASHBOARD_PAGES.REPEAT_WORDS}
          >
            <RefreshCcw />
          </Link>
        </div>
      );
      break;
    }
    case 'texts':
      content = (
        <div className="flex items-center gap-2">
          <Link
            className="px-2 py-1 bg-blue-600 flex gap-1 items-center rounded-md hover:opacity-80 transition-opacity"
            href={DASHBOARD_PAGES.TEXTS_CREATE}
          >
            <Plus />
          </Link>
        </div>
      );
      break;
    case 'phrases':
      content = (
        <div className="flex items-center gap-2">
          <Link
            className="px-2 py-1 bg-blue-600 flex gap-1 items-center rounded-md hover:opacity-80 transition-opacity"
            href={DASHBOARD_PAGES.PHRASES_CREATE}
          >
            <Plus />
          </Link>
          <Link
            className="px-2 py-1 bg-blue-600 flex gap-1 items-center rounded-md hover:opacity-80 transition-opacity"
            href={DASHBOARD_PAGES.REPEAT_PHRASES}
          >
            <RefreshCcw />
          </Link>
        </div>
      );
      break;
    case 'repeat-words':
      content = (
        <div className="flex items-center">
          <span className="text-[22px] text-blue-500">Get random words:</span>
          <Button className="ml-6 px-1.5 flex items-center gap-0.5">
            <Plus className="w-5 h-5" />
            <span className="text-[16px]">5</span>
          </Button>
          <Button className="ml-2 px-1.5 flex items-center gap-0.5">
            <Plus className="w-5 h-5" />
            <span className="text-[16px]">10</span>
          </Button>
          <Button className="ml-2 px-1.5 flex items-center gap-0.5">
            <Plus className="w-5 h-5" />
            <span className="text-[16px]">15</span>
          </Button>
        </div>
      );
      break;
    case 'repeat-phrases':
      content = (
        <div className="flex items-center">
          <span className="text-[22px] text-blue-500">Get random phrases:</span>
          <Button className="ml-6 px-1.5 flex items-center gap-0.5">
            <Plus className="w-5 h-5" />
            <span className="text-[16px]">5</span>
          </Button>
          <Button className="ml-2 px-1.5 flex items-center gap-0.5">
            <Plus className="w-5 h-5" />
            <span className="text-[16px]">10</span>
          </Button>
          <Button className="ml-2 px-1.5 flex items-center gap-0.5">
            <Plus className="w-5 h-5" />
            <span className="text-[16px]">15</span>
          </Button>
        </div>
      );
      break;
    default: {
      content = '';
      break;
    }
  }

  return (
    <header className="p-layout bg-primary rounded-lg opacity_anim">
      <div className="flex items-center justify-between">
        {content}

        <div className="ml-auto">
          <Locations />
        </div>
      </div>
    </header>
  );
}
