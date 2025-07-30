import DashboardLayout from '@/src/components/ui/dashboard-layout/DashboardLayout';
import { PhraseForm } from './PhraseForm';
import CreatePhrasePage from './CreatePhrasePage';

export default function CreatePhrase() {
  return (
    <DashboardLayout>
      <CreatePhrasePage />
    </DashboardLayout>
  );
}
