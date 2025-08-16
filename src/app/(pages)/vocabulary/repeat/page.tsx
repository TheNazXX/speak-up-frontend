import { vocabularyService } from '@/src/app/entities/vocabularly/api/vocabulary.service';
import DashboardLayout from '@/src/components/ui/dashboard-layout/DashboardLayout';
import RepeatPage from '@/src/components/vocabulary/RepeatPage';
import { VocabularyTypes } from '../../../entities/vocabularly/model/vocabularySlice';

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
