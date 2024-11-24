import { PropsWithChildren } from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid min-h-screen grid-cols-[1fr_7fr] shrink-0">
      <Sidebar />

      <main className="p-big-layout overflow-x-hidden max-h-screen relative">
        <Header />
        <div className="bg-primary min-h-[85%] mt-4 rounded-lg p-layout opacity_anim ralatice">
          {children}
        </div>
      </main>
    </div>
  );
}
