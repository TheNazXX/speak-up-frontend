import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import TextPageCreate from '@/components/texts/TextPageCreate';
import { textService } from '@/app/services/texts.service';

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
      <TextPageCreate data={response.data[0]} mode="edit" />
    </DashboardLayout>
  );
}
