'use client';

import { WithHeaderState } from '@/src/app/hoc/WithHeaderState';
import { transformVocabularyByDate } from '@/src/app/entities/vocabularly/model/libs';
import { IVocabularyItem } from '@/src/app/entities/vocabularly/model/types';
import { VocabularyListByDate } from '@/src/components/vocabulary/ui/VocabularyListByDate';

type VocabularyPageProps = IVocabularyItem[];

const VocabularyPage = ({ data }: { data: VocabularyPageProps }) => {
  return (
    <>
      <VocabularyListByDate data={transformVocabularyByDate(data)} />
    </>
  );
};

export default WithHeaderState(VocabularyPage, 'vocabulary');
