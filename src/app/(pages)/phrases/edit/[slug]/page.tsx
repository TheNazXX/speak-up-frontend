import { PhraseForm } from '../../create/PhraseForm';
import DashboardLayout from '@/src/components/ui/dashboard-layout/DashboardLayout';
import PhraseEditPage from './PhraseEditPage';

export default function EditPhrasePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <DashboardLayout>
      <PhraseEditPage slug={slug} />
    </DashboardLayout>
  );
}
