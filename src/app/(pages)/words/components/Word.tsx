import { IWord } from '@/app/(pages)/words/model/types/word.types';
import { IRepeatWord } from '@/app/types/repeat-words';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import Link from 'next/link';

export default function Word({ item }: { item: IWord | IRepeatWord }) {
  return (
    <Link
      className="text-white p-2 bg-blue-600 rounded-md leading-6 hover:opacity-80 transition-opacity text-sm relative whitespace-nowrap"
      href={`${DASHBOARD_PAGES.WORDS}/${item.en}`}
    >
      {item.en}
    </Link>
  );
}
