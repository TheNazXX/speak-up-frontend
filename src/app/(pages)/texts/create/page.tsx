import DashboardLayout from '@/src/components/ui/dashboard-layout/DashboardLayout';
import TextsCreate from '@/src/components/texts/TextPageCreate';

export default function TextsCreatePage() {
  return (
    <DashboardLayout>
      <TextsCreate mode="create" />
    </DashboardLayout>
  );
}
