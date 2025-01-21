'use client';

import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';

export default function Loader({ className }: { className?: string }) {
  return (
    <div className="animate-spin text-blue-300 w-max">
      <LoaderCircle className={clsx('w-10 h-10', className)} />
    </div>
  );
}
