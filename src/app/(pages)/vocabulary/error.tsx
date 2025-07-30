'use client';
// import { errorCatch } from '@/app/api/error';
// import DashboardLayout from '@/components/ui/dashboard-layout/DashboardLayout';
// import { ServerCrash } from 'lucide-react';
// import { useEffect } from 'react';
// import { toast, Toaster } from 'sonner';

// export default function ErrorPage({
//   error,
//   reset,
// }: {
//   error: Error & { digest?: string };
//   reset: () => void;
// }) {
//   useEffect(() => {
//     toast.error(errorCatch(error));
//   }, [error, reset]);

//   return (
//     <DashboardLayout>
//       <ServerCrash className="w-8 h-8 absolute top-1/2 left-1/2" />
//       <Toaster richColors />
//     </DashboardLayout>
//   );
// }
