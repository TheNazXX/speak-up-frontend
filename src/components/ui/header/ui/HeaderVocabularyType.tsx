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
    <div className="flex items-center gap-2">
      <div className="border-r-2 border-primary mr-3 pr-4 flex items-center gap-2">
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
      <div className="flex items-center gap-2">
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
