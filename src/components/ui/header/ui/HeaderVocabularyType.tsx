import { Plus, RefreshCcw } from 'lucide-react';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import Button from '../../button/Button';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export const HeaderVocabularyType = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeVocabulary, setActiveVocabulary] = useState('words');

  return (
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
    </div>
  );
};
