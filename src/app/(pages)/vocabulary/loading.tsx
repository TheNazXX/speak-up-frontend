import DashboardLayout from '@/src/components/ui/dashboard-layout/DashboardLayout';
import Loader from '@/src/components/ui/loader/Loader';

export default function Loading() {
  return (
    <DashboardLayout>
      <div className="absolute top-1/2 left-1/2">
        <Loader />
      </div>
    </DashboardLayout>
  );
}
