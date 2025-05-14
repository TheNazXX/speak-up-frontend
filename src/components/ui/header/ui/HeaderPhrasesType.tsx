import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import Link from 'next/link';
import { Plus, RefreshCcw } from 'lucide-react';

export const HeaderPhrasesType = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        className="px-2 py-1 bg-primary flex gap-1 items-center rounded-md hover:opacity-80 transition-opacity"
        href={DASHBOARD_PAGES.PHRASES_CREATE}
      >
        <Plus />
      </Link>
      <Link
        className="px-2 py-1 bg-primary flex gap-1 items-center rounded-md hover:opacity-80 transition-opacity"
        href={DASHBOARD_PAGES.REPEAT_PHRASES}
      >
        <RefreshCcw />
      </Link>
    </div>
  );
};
