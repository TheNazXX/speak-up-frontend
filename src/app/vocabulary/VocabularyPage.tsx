import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { ArrowBigRight } from 'lucide-react';
import Link from 'next/link';

export const VocabularyPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Link
        href={DASHBOARD_PAGES.WORDS}
        className="flex items-center justify-between bg-blue-600 px-4 py-8 rounded-md transition-all hover:bg-blue-700 max-w-[20%] hover:max-w-[25%]"
      >
        Words
        <ArrowBigRight />
      </Link>

      <Link
        href={DASHBOARD_PAGES.PHRASES}
        className="flex items-center justify-between bg-blue-600 px-4 py-8 rounded-md transition-all hover:bg-blue-700 max-w-[20%] hover:max-w-[25%]"
      >
        Phrases
        <ArrowBigRight />
      </Link>
    </div>
  );
};
