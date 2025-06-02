import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import VocabularyPage from '@/components/vocabulary/VocabularyPage';
import { VocabularyTypes } from './model/vocabularySlice';
import { vocabularyService } from '@/app/services/vocabulary/vocabulary.service';

type Props = {
  searchParams: {
    type: VocabularyTypes;
  };
};

export default async function Page({ searchParams }: Props) {
  const type = searchParams['type'] || VocabularyTypes.WORDS;

  const response = await vocabularyService.getVocabulary(type);

  return (
    <DashboardLayout>
      <VocabularyPage data={response?.data || []} />
    </DashboardLayout>
  );
}
