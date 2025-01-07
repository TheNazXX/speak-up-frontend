import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import PhraseSingle from './PhraseSingle';

export default function PhrasePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <DashboardLayout>
      <PhraseSingle slug={slug} />
    </DashboardLayout>
  );
}
