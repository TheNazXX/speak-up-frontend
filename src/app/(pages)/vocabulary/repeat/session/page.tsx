import { vocabularyService } from '@/src/app/entities/vocabularly/api/vocabulary.service';
import DashboardLayout from '@/src/components/ui/dashboard-layout/DashboardLayout';
import { RepeatSessionPage } from '@/src/components/vocabulary/RepeatSessionPage';
import { VocabularyTypes } from '@/src/app/entities/vocabularly/model/vocabularySlice';

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

export const dynamic = 'force-dynamic';
export const revalidate = 0;
