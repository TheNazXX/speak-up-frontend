import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import Link from 'next/link';

export const VocabularyPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Link
        href={DASHBOARD_PAGES.WORDS}
        className="block bg-blue-600 px-4 py-8 rounded-md transition-all hover:bg-blue-700 max-w-[25%] hover:max-w-[100%]"
      >
        Words
      </Link>

      <Link
        href={DASHBOARD_PAGES.PHRASES}
        className="block bg-blue-600 px-4 py-8 rounded-md transition-all hover:bg-blue-700 max-w-[25%] hover:max-w-[100%]"
      >
        Phrases
      </Link>
    </div>
  );
};
