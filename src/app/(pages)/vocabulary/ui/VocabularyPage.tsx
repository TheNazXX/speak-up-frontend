import { transformVocabularyByDate } from '../model/libs';
import { IVocabularyItem } from '../model/types';
import { VocabularyList } from './VocabularyList';

type VocabularyPageProps = IVocabularyItem[];

export const VocabularyPage = ({ data }: { data: VocabularyPageProps }) => {
  return (
    <>
      <VocabularyList data={transformVocabularyByDate(data)} />
    </>
  );
};
