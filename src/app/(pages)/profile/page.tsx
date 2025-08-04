import { Schedule } from '@/src/app/components/Schedule';
import DashboardLayout from '@/src/components/ui/dashboard-layout/DashboardLayout';

export default function Profile() {
  return (
    <DashboardLayout>
      <div>
        <Schedule />
      </div>
    </DashboardLayout>
  );
}
