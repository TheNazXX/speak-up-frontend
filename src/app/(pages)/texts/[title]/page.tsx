import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import { textService } from '@/app/services/texts.service';
import TextPage from '@/components/texts/TextPage';

export default async function Page({
  params: { title },
}: {
  params: { title: string };
}) {
  const response = await textService.getByTitle(title);

  if (!response?.data) {
    return;
  }

  return (
    <DashboardLayout>
      <TextPage data={response?.data[0]} />
    </DashboardLayout>
  );
}
