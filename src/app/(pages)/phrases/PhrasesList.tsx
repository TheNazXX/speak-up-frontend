import { IPhrase } from './model/types/phrase.types';
import { motion } from 'framer-motion';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import Link from 'next/link';

import { animations } from '@/lib/motion';

export default function PhrasesList({ data }: { data: IPhrase[] }) {
  return (
    <div className="flex gap-2.5 flex-wrap gap-y-8">
      {data.map((item, idx) => (
        <motion.div key={item.en} {...animations.appearance(idx * 0.1)}>
          <Link
            className="text-white p-2 bg-blue-600 rounded-md leading-6 hover:opacity-80 transition-opacity text-sm"
            href={`${DASHBOARD_PAGES.PHRASES}/${item.en}`}
          >
            {item.en}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
