import { PropsWithChildren } from 'react';
import { MenuData } from './menu.data';
import MenuItem from './MenuItem';
import Link from 'next/link';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import Image from 'next/image';
import Logo from '@/app/assets/logo.svg';

export default function Sidebar({ children }: PropsWithChildren) {
  return (
    <aside className="border-r border-r-primary h-full bg-backgroundPrimary flex flex-col">
      <div className="py-6 text-center">
        <Link className="text-shadow text-2xl" href={DASHBOARD_PAGES.HOME}>
          Speak-up
        </Link>
      </div>
      {MenuData.map((item) => {
        return (
          <MenuItem
            key={item.label}
            item={item}
            className="border-primary border-t-primary border-t last:border-b"
          />
        );
      })}
    </aside>
  );
}
