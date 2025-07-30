import { vocabularyService } from '@/app/services/vocabulary/vocabulary.service';
import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import { VocabularyCreatePage } from '@/components/vocabulary/VocabularyCreatePage';

export default async function Page({ params }: { params: { en: string } }) {
  const { en } = params;

  const data = await vocabularyService.getVocabularyByEn(en);
  if (!data?.data) {
    return <DashboardLayout>Vocabulary not found</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <VocabularyCreatePage defaultData={data.data} mode="edit" />
    </DashboardLayout>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
