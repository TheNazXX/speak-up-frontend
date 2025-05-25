import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
import Loader from '@/components/ui/loader/Loader';

export default function Loading() {
  return (
    <DashboardLayout>
      <div className="absolute top-1/2 left-1/2">
        <Loader />
      </div>
    </DashboardLayout>
  );
}
