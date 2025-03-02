import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import Words from './components/Words';
import Header from '@/components/ui/header/Header';
import { Toaster } from 'sonner';

export default function WordsPage() {
  return (
    <DashboardLayout>
      <Words />
    </DashboardLayout>
  );
}
