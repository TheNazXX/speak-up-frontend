import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';

export default function Loader({ className }: { className?: string }) {
  return (
    <div className={clsx('animate-spin text-primaryLight w-max', className)}>
      <LoaderCircle className={clsx('w-10 h-10', className)} />
    </div>
  );
}
