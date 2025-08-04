import DashboardLayout from '@/src/components/ui/dashboard-layout/DashboardLayout';
import { VocabularyCreatePage } from '@/src/components/vocabulary/VocabularyCreatePage';

export default function Page() {
  return (
    <DashboardLayout>
      <VocabularyCreatePage mode="create" />
    </DashboardLayout>
  );
}
