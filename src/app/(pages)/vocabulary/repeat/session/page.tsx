import { vocabularyService } from '@/app/services/vocabulary/vocabulary.service';
import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import { RepeatSessionPage } from '@/components/vocabulary/RepeatSessionPage';
import { VocabularyTypes } from '@/app/(pages)/vocabulary/model/vocabularySlice';

type Props = {
  searchParams: {
    type?: VocabularyTypes;
    createdAt?: string;
    repeatedAt?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const { repeatedAt, createdAt, type } = searchParams;
  const data = await vocabularyService.getVocabulary(
    type,
    createdAt,
    repeatedAt
  );

  return (
    <DashboardLayout>
      <RepeatSessionPage data={data.data || []} />
    </DashboardLayout>
  );
}
