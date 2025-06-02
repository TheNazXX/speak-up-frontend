import { IVocabularyItem } from '@/app/(pages)/vocabulary/model/types';
import { VocabularyList } from './ui/VocabularyList';

export const RepeatSessionPage = ({ data }: { data: IVocabularyItem[] }) => {
  return <VocabularyList data={data} isInteractive={false} />;
};
