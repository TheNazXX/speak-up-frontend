import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import TextSingle from '../ui/TextContainer';

export default function TextPage({
  params: { name },
}: {
  params: { name: string };
}) {
  return (
    <DashboardLayout>
      <TextSingle name={name} />
    </DashboardLayout>
  );
}
