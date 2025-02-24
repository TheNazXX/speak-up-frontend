import React, { useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

import { WordsListColumn } from './WordsListColumn';
import { WordsListItem } from './WordsListItem';
import { IWord } from '../model/types/word.types';

export function WordsListRow({ words }: { words: IWord[] }) {
  const [items, setItems] = useState({
    current: words.map((item) => item.en),
    old: [],
  });

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setItems((items) => move(items, event));
      }}
    >
      <div className="flex w-full justify-between">
        {Object.entries(items).map(([column, items], index) => (
          <WordsListColumn
            className={index === 0 ? 'w-[65%]' : 'bg-black w-[30%] rounded-lg'}
            key={column}
            id={column}
          >
            {items.map((item, index) => (
              <WordsListItem
                key={item}
                id={item}
                index={index}
                column={column}
                item={words.find((currentItem) => currentItem.en === item)}
              />
            ))}
          </WordsListColumn>
        ))}
      </div>
    </DragDropProvider>
  );
}
