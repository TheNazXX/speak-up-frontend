'use client';

import { PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Locations from '../locations/Locations';
import { selectHeader } from './model/headerSlice';
import { HeaderPageState } from '@/src/components/ui/header/model/headerSlice';
import { useRouter } from 'next/navigation';
import { HeaderTextType } from './ui/HeaderTextType';
import { HeaderVocabularyType } from './ui/HeaderVocabularyType';
import { HeaderRepeatVocabulary } from './ui/HeaderRepeatVocabulary';
import { Menu, X } from 'lucide-react';
import { selectSidebar, toggleSidebar } from '../sidebar/model/sidebarSlice';
import Button from '../button/Button';

export default function Header({ children }: PropsWithChildren) {
  const header: HeaderPageState = useSelector(selectHeader);
  const isOpenSidebar: boolean = useSelector(selectSidebar);

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
      <div className="flex md:items-center justify-between gap-y-4">
        {content}

        <div className="ml-auto md:flex hidden">
          <Locations />
        </div>

        <Button
          className="ml-auto md:hidden"
          onClick={() => dispatch(toggleSidebar(!isOpenSidebar))}
        >
          {!isOpenSidebar ? <Menu /> : <X />}
        </Button>
      </div>
    </header>
  );
}
