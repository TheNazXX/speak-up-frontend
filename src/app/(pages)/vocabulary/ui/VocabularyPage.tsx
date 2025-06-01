'use client';

import { WithHeaderState } from '@/app/hoc/WithHeaderState';
import { transformVocabularyByDate } from '../model/libs';
import { IVocabularyItem } from '../model/types';
import { VocabularyList } from './VocabularyList';

type VocabularyPageProps = IVocabularyItem[];

const VocabularyPage = ({ data }: { data: VocabularyPageProps }) => {
  return (
    <>
      <VocabularyList data={transformVocabularyByDate(data)} />
    </>
  );
};

export default WithHeaderState(VocabularyPage, 'vocabulary');
