import { DASHBOARD_PAGES } from '@/src/config/pages-url.config';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const HeaderTextType = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        className="px-2 py-1 bg-primary flex gap-1 items-center rounded-md hover:opacity-80 transition-opacity"
        href={DASHBOARD_PAGES.TEXTS_CREATE}
      >
        <Plus />
      </Link>
    </div>
  );
};
