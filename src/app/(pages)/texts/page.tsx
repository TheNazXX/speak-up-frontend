import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import TextList from '@/components/texts/TextsPage';
import { textService } from '@/app/services/texts.service';
import TextsPage from '@/components/texts/TextsPage';

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
