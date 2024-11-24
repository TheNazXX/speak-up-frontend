import { PropsWithChildren } from "react";
import { MenuData } from "./menu.data";
import MenuItem from "./MenuItem";
import Link from "next/link";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Image from "next/image";
import Logo from "@/app/assets/logo.svg";

export default function Sidebar({ children }: PropsWithChildren) {
  return (
    <aside className="border-r border-r-blue-600 h-full bg-primary flex flex-col">
      <div className="mb-10">
        <Link href={DASHBOARD_PAGES.HOME}>
          <Image src={Logo} width={200} height={100} alt="Speak-up" />
        </Link>
      </div>
      {MenuData.map((item) => {
        return (
          <MenuItem
            key={item.label}
            item={item}
            className="border-blue-600 border-t-blue-600 border-t last:border-b"
          />
        );
      })}
    </aside>
  );
}
