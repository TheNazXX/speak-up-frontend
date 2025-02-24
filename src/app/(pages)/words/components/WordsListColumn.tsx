import React, { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/react';
import { CollisionPriority } from '@dnd-kit/abstract';
import clsx from 'clsx';

export interface IWordsListColumnProps {
  children: ReactNode;
  id: string;
  className?: string;
}

export function WordsListColumn({
  children,
  id,
  className,
}: IWordsListColumnProps) {
  const { ref } = useDroppable({
    id,
    type: 'column',
    accept: ['item'],
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div
      className={clsx('flex flex-wrap gap-x-2 gap-y-4 p-4', className)}
      ref={ref}
    >
      {children}
    </div>
  );
}
