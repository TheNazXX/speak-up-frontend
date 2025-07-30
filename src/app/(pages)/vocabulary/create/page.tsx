import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import { VocabularyCreatePage } from '@/components/vocabulary/VocabularyCreatePage';

export default function Page() {
  return (
    <DashboardLayout>
      <VocabularyCreatePage mode="create" />
    </DashboardLayout>
  );
}
