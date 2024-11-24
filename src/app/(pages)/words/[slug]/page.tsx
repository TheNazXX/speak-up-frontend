import DashboardLayout from "@/components/ui/dashboard-layout/DashboardLayout";
import WordSingle from "./WordSingle";

export default function Word({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <DashboardLayout>
      <WordSingle slug={slug} />
    </DashboardLayout>
  );
}
