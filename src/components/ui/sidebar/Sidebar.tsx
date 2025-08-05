'use client';

import { PropsWithChildren } from 'react';
import { MenuData } from './menu.data';
import MenuItem from './MenuItem';
import Link from 'next/link';
import { DASHBOARD_PAGES } from '@/src/config/pages-url.config';
import Locations from '@/src/components/ui/locations/Locations';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectSidebar, toggleSidebar } from './model/sidebarSlice';

export default function Sidebar({ children }: PropsWithChildren) {
  const isOpenSidebar = useSelector(selectSidebar);
  const dispatch = useDispatch();

  return (
    <>
      <aside
        className={clsx(
          isOpenSidebar
            ? ' md:-translate-x-0'
            : '-translate-x-[100%] md:-translate-x-0',
          'flex border-r border-r-primary h-[101%] bg-backgroundPrimary flex-col fixed md:static z-20 transition-all'
        )}
      >
        <div className="py-6 text-center">
          <Link className="text-shadow text-2xl" href={DASHBOARD_PAGES.HOME}>
            Speak-up
          </Link>
        </div>
        <div>
          {MenuData.map((item) => {
            return (
              <MenuItem
                key={item.label}
                item={item}
                className="border-primary border-t-primary border-t last:border-b"
              />
            );
          })}
        </div>

        <div className="flex items-center gap-2 mt-auto pb-8 mx-auto md:hidden">
          <Locations />
        </div>
      </aside>
      {isOpenSidebar && (
        <div
          onClick={() => dispatch(toggleSidebar(false))}
          className="absolute h-full bg-black opacity-60 w-full z-10"
        />
      )}
    </>
  );
}
