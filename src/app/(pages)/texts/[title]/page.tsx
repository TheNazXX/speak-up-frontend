import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import { textService } from '@/app/services/texts.service';
import { toast, Toaster } from 'sonner';
import Error from '@/components/ui/error/Error';
import { errorCatch } from '@/app/api/error';
import Loader from '@/components/ui/loader/Loader';
import TextsContent from '@/app/components/texts/TextPage';
import TextPage from '@/app/components/texts/TextPage';

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
