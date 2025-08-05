import { Plus, RefreshCcw } from 'lucide-react';
import { DASHBOARD_PAGES } from '@/src/config/pages-url.config';

import Button from '../../button/Button';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  LOCAL_STORAGE_ACTIVE_VOCABULARY_KEY,
  VocabularyTypes,
} from '@/src/app/(pages)/vocabulary/model/vocabularySlice';

export const HeaderVocabularyType = () => {
  const router = useRouter();
  const activeType = useSearchParams().get('type');

  return (
    <div className="flex md:items-center gap-2 flex-wrap">
      <div className="order-2 sm:order-1 md:border-r-2 border-primary sm:mr-3 sm:pr-4 pr-2 flex items-center gap-2">
        <Button
          size={'sm'}
          className="px-0 py-4 leading-[12px]"
          onClick={() => router.push(DASHBOARD_PAGES.VOCABULARY_CREATE)}
        >
          <Plus />
        </Button>
        <Button
          size={'sm'}
          className="px-0 py-4 leading-[12px]"
          onClick={() =>
            router.push(
              `${DASHBOARD_PAGES.VOCABULARY_REPEAT}?type=${activeType}`
            )
          }
        >
          <RefreshCcw />
        </Button>
      </div>
      <div className="order-1 sm:order-2 flex items-center gap-2">
        <Button
          disabled={activeType === VocabularyTypes.WORDS}
          size={'md'}
          className="px-0 py-4 leading-[12px]"
          onClick={() => {
            localStorage.setItem(
              LOCAL_STORAGE_ACTIVE_VOCABULARY_KEY,
              VocabularyTypes.WORDS
            );
            router.push(DASHBOARD_PAGES.VOCABULARY_WORDS);
          }}
        >
          Words
        </Button>
        <Button
          disabled={activeType === VocabularyTypes.PHRASES}
          size={'md'}
          className="px-0 py-4 leading-[12px]"
          onClick={() => {
            localStorage.setItem(
              LOCAL_STORAGE_ACTIVE_VOCABULARY_KEY,
              VocabularyTypes.PHRASES
            );
            router.push(DASHBOARD_PAGES.VOCABULARY_PHRASES);
          }}
        >
          Phrases
        </Button>
      </div>
    </div>
  );
};
