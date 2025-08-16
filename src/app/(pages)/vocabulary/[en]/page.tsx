import { vocabularyService } from '@/src/app/entities/vocabularly/api/vocabulary.service';
import DashboardLayout from '@/src/components/ui/dashboard-layout/DashboardLayout';
import { VocabularySinglePage } from '@/src/components/vocabulary/VocabularySinglePage';

export default async ({ params }: { params: { en: string } }) => {
  const { en } = params;

  const data = await vocabularyService.getVocabularyByEn(en);
  if (!data?.data) {
    return <DashboardLayout>Vocabulary not found</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <VocabularySinglePage data={data?.data} />
    </DashboardLayout>
  );
};

export const dynamic = 'force-dynamic';
