import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import { CreatePhraseForm } from './PhraseForm';

export default function CreatePhrasePage() {
  return (
    <DashboardLayout>
      <CreatePhraseForm mode="create" />
    </DashboardLayout>
  );
}
