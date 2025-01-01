import { Schedule } from '@/app/components/Schedule';
import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';

export default function Profile() {
  return (
    <DashboardLayout>
      <div>
        <Schedule />
      </div>
    </DashboardLayout>
  );
}
