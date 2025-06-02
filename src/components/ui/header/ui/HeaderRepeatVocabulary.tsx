import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import Button from '../../button/Button';
import { useRouter, useSearchParams } from 'next/navigation';

import { VocabularyTypes } from '@/app/(pages)/vocabulary/model/vocabularySlice';

export const HeaderRepeatVocabulary = () => {
  const router = useRouter();
  const activeType = useSearchParams().get('type');

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <Button
          disabled={activeType === VocabularyTypes.WORDS}
          size={'md'}
          className="px-0 py-4 leading-[12px]"
          onClick={() => {
            router.push(`${DASHBOARD_PAGES.VOCABULARY_REPEAT}?type=words`);
          }}
        >
          Words
        </Button>
        <Button
          disabled={activeType === VocabularyTypes.PHRASES}
          size={'md'}
          className="px-0 py-4 leading-[12px]"
          onClick={() => {
            router.push(`${DASHBOARD_PAGES.VOCABULARY_REPEAT}?type=phrases`);
          }}
        >
          Phrases
        </Button>
      </div>
    </div>
  );
};
