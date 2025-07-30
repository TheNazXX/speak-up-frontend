import DashboardLayout from '@/src/components/ui/dashboard-layout/DashboardLayout';
import WordEditComponent from './WordEditPage';

export default function WordEditPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <DashboardLayout>
      <WordEditComponent slug={slug} />
    </DashboardLayout>
  );
}
