'use client';

import { WithHeaderState } from '@/app/hoc/WithHeaderState';
import { transformVocabularyByDate } from '@/app/(pages)/vocabulary/model/libs';
import { IVocabularyItem } from '@/app/(pages)/vocabulary/model/types';
import { VocabularyListByDate } from '@/components/vocabulary/ui/VocabularyListByDate';

type VocabularyPageProps = IVocabularyItem[];

const VocabularyPage = ({ data }: { data: VocabularyPageProps }) => {
  return (
    <>
      <VocabularyListByDate data={transformVocabularyByDate(data)} />
    </>
  );
};

export default WithHeaderState(VocabularyPage, 'vocabulary');
