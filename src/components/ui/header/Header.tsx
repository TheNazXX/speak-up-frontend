'use client';

import { PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Locations from '../locations/Locations';
import { selectHeader } from './model/headerSlice';
import { HeaderPageState } from '@/components/ui/header/model/headerSlice';

import { useRouter } from 'next/navigation';
import { HeaderTextType } from './ui/HeaderTextType';
import { HeaderVocabularyType } from './ui/HeaderVocabularyType';
import { HeaderRepeatVocabulary } from './ui/HeaderRepeatVocabulary';

export default function Header({ children }: PropsWithChildren) {
  const header: HeaderPageState = useSelector(selectHeader);
  const dispatch = useDispatch();

  const router = useRouter();

  let content;

  switch (header) {
    case 'texts':
      content = <HeaderTextType />;
      break;
    case 'vocabulary':
      content = <HeaderVocabularyType />;
      break;
    case 'vocabulary-repeat':
      content = <HeaderRepeatVocabulary />;
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
