import React, { useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

import { WordsListColumn } from './WordsListColumn';
import { WordsListItem } from './WordsListItem';
import { IWord } from '../model/types/word.types';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/button/Button';
import clsx from 'clsx';
import { wordsService } from '../model/services/words.service';
import { useMutation } from '@tanstack/react-query';
import Loader from '@/components/ui/loader/Loader';
import { toast } from 'sonner';

export function WordsListRow({ words }: { words: IWord[] }) {
  const [items, setItems] = useState({
    current: words.map((item) => item.en),
    old: [],
  });

  const { mutate: postOldWords, status: postOldWordsStatus } = useMutation({
    mutationFn: (words: string[]) => wordsService.postOldWords(words),
    onSuccess: (data) => {
      setItems((items) => ({
        current: items.current,
        old: [],
      }));
      toast.success('Words added to old successfully');
    },
    onError: (error) => {},
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
            className={clsx(
              'relative',
              index === 0 ? 'w-[65%]' : 'bg-black w-[30%] rounded-lg'
            )}
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

            {index === 1 && postOldWordsStatus !== 'pending' && (
              <Button
                className="absolute right-1.5 top-4 hover:opacity-80 transition-all"
                size={'zero'}
                onClick={() => postOldWords(items)}
              >
                <Plus className="text-blue-600" />
              </Button>
            )}

            {index === 1 && postOldWordsStatus === 'pending' && (
              <div className="absolute right-1 top-0">
                <Loader className="w-6" />
              </div>
            )}
          </WordsListColumn>
        ))}
      </div>
    </DragDropProvider>
  );
}
