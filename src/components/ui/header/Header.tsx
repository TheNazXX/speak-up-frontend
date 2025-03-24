'use client';

import { PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Locations from '../locations/Locations';
import { Plus, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { selectHeader } from './model/headerSlice';
import { HeaderPageState } from '@/components/ui/header/model/headerSlice';
import Button from '../button/Button';
import { btns } from '@/app/vocabulary/model/data';
import {
  ActiveVocabulary,
  selectActiveVocabulary,
  setActiveVocabulary,
} from '@/app/vocabulary/model/vocabularySlice';
import { useRouter } from 'next/navigation';

export default function Header({ children }: PropsWithChildren) {
  const header: HeaderPageState = useSelector(selectHeader);
  const dispatch = useDispatch();
  const activeVocabulary = useSelector(selectActiveVocabulary);
  const router = useRouter();

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
    case 'vocabulary':
      content = (
        <div className="flex items-center gap-2">
          <div className="border-r-2 border-primary mr-3 pr-4 flex items-center gap-2">
            <Button
              size={'sm'}
              className="px-0 py-4 leading-[12px]"
              onClick={() =>
                router.push(
                  activeVocabulary === 'phrases'
                    ? DASHBOARD_PAGES.PHRASES_CREATE
                    : DASHBOARD_PAGES.WORDS_CREATE
                )
              }
            >
              <Plus />
            </Button>
            <Button
              size={'sm'}
              className="px-0 py-4 leading-[12px]"
              onClick={() =>
                router.push(
                  activeVocabulary === 'phrases'
                    ? DASHBOARD_PAGES.REPEAT_PHRASES
                    : DASHBOARD_PAGES.REPEAT_WORDS
                )
              }
            >
              <RefreshCcw />
            </Button>
          </div>
          {btns.map(({ label, value }) => (
            <Button
              disabled={activeVocabulary === value}
              onClick={() => dispatch(setActiveVocabulary(value))}
              className="flex items-center justify-between bg-primary border border-primaryLight rounded-sm py-1 px-2 transition-all hover:bg-primaryLight w-max text-sm"
            >
              {label}
            </Button>
          ))}
        </div>
      );
      break;
    default: {
      content = '';
      break;
    }
  }

  return (
    <header className="p-layout bg-backgroundPrimary rounded-sm opacity_anim">
      <div className="flex items-center justify-between">
        {content}

        <div className="ml-auto">
          <Locations />
        </div>
      </div>
    </header>
  );
}
