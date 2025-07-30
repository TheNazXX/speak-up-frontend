import { vocabularyService } from '@/app/services/vocabulary/vocabulary.service';
import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import RepeatPage from '@/components/vocabulary/RepeatPage';
import { VocabularyTypes } from '../model/vocabularySlice';

type Props = {
  searchParams: {
    type: VocabularyTypes;
  };
};

export default async function Page({ searchParams }: Props) {
  const { type } = searchParams;

  const [createdVocabularyDates, repeatedDatesDatas] = await Promise.all([
    vocabularyService.getVocabularyDates('created-dates', type),
    vocabularyService.getVocabularyDates('repeated-dates', type),
  ]);

  return (
    <DashboardLayout>
      <RepeatPage
        createdVocabularyDates={createdVocabularyDates.data ?? []}
        repeatedVocabularyDates={repeatedDatesDatas.data ?? []}
      />
    </DashboardLayout>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
