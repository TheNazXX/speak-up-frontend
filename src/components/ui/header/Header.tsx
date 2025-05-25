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

import { useRouter } from 'next/navigation';
import { HeaderWordsType } from './ui/HeaderWordsType';
import { HeaderTextType } from './ui/HeaderTextType';
import { HeaderPhrasesType } from './ui/HeaderPhrasesType';
import { HeaderRepeatWordsType } from './ui/HeaderRepeatWordsType';
import { HeaderRepeatPhrasesType } from './ui/HeaderRepeatPhrasesType';
import { HeaderVocabularyType } from './ui/HeaderVocabularyType';

export default function Header({ children }: PropsWithChildren) {
  const header: HeaderPageState = useSelector(selectHeader);
  const dispatch = useDispatch();

  const router = useRouter();

  let content;

  switch (header) {
    case 'words': {
      content = <HeaderWordsType />;
      break;
    }
    case 'texts':
      content = <HeaderTextType />;
      break;
    case 'phrases':
      content = <HeaderPhrasesType />;
      break;
    case 'repeat-words':
      content = <HeaderRepeatWordsType />;
      break;
    case 'repeat-phrases':
      content = <HeaderRepeatPhrasesType />;
      break;
    case 'vocabulary':
      content = <HeaderVocabularyType />;
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
