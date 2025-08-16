import DashboardLayout from '@/src/components/ui/dashboard-layout/DashboardLayout';
import { RepeatQuiz } from './processes/repeat-quiz/ui/RepeatQuiz';

export default function Home() {
  return (
    <DashboardLayout>
      <RepeatQuiz />
    </DashboardLayout>
  );
}
