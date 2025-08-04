import { PropsWithChildren } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid min-h-screen md:grid-cols-[1fr_7fr] shrink-0 relative">
      <Sidebar />

      <main className="md:p-big-layout p-small-layout overflow-x-hidden max-h-screen relative">
        <Header />
        <div className="bg-backgroundPrimary min-h-[85%] mt-4 rounded-sm p-layout opacity_anim relative">
          {children}
        </div>
      </main>
    </div>
  );
}
