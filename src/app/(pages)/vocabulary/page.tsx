import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import VocabularyPage from './ui/VocabularyPage';
import { VocabularyTypes } from './model/vocabularySlice';
import { IVocabularyItem } from './model/types';
import { vocabularyService } from '@/app/services/vocabulary/vocabulary.service';
import Loader from '@/components/ui/loader/Loader';

type Props = {
  searchParams: {
    type: VocabularyTypes;
  };
};

export default async function Page({ searchParams }: Props) {
  const type = searchParams['type'] || VocabularyTypes.WORDS;

  const response = await vocabularyService.getVocabularyType(type);

  return (
    <DashboardLayout>
      <VocabularyPage data={response?.data || []} />
    </DashboardLayout>
  );
}
