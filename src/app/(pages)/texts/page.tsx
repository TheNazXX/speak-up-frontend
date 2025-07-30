import DashboardLayout from '@/src/components/ui/dashboard-layout/DashboardLayout';
import { textService } from '@/src/app/services/texts.service';
import TextsPage from '@/src/components/texts/TextsPage';

export default async function Page() {
  const data = await textService.getAll();

  return (
    <DashboardLayout>
      <div className="grid grid-cols-[1fe]">
        <TextsPage data={data?.data || []} />
      </div>
    </DashboardLayout>
  );
}

export const dynamic = 'force-dynamic';
