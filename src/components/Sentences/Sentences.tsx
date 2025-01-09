import { Brush, Edit, Trash2 } from 'lucide-react';
import Button from '../ui/button/Button';
import { useState } from 'react';
import { ISentence } from '@/app/(pages)/words/model/types/sentence.types';

export const Sentences = ({
  sentences,
  targetWord,
}: {
  sentences: string[];
  targetWord?: string;
}) => {
  const [isEdit, setIdEdit] = useState<string | null>(null);

  const capitalizeFirstLetter = (text: string) => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <ul className="list-disc pl-6 pb-6 flex flex-col gap-2">
      {sentences.map((sentece: string, idx: number) => {
        const highlightedText = targetWord
          ? sentece.replace(
              new RegExp(`(${targetWord.split(' ')[1] || targetWord})`, 'gi'),
              '<b class="text-blue-500">$1</b>'
            )
          : sentece;

        return (
          <li className="" key={idx}>
            <span
              dangerouslySetInnerHTML={{
                __html: capitalizeFirstLetter(highlightedText),
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};
