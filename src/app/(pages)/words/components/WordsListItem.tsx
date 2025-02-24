import React from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
import Word from './Word';

export function WordsListItem({ id, column, index, item }: any) {
  const { ref } = useSortable({
    id,
    index,
    group: column,
    type: 'item',
    accept: ['item'],
  });

  return (
    <div ref={ref}>
      <Word item={item} />
    </div>
  );
}
