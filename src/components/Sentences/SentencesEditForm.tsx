import { Brush, Edit, Save, Trash2 } from 'lucide-react';
import Button from '../ui/button/Button';
import { useState } from 'react';
import { ISentence } from '@/app/(pages)/words/model/types/sentence.types';
import Input from '../ui/input/Input';

export const SentencesEditForm = ({
  sentences,
  targetWord,
  onEditSentence,
}: {
  sentences: ISentence[];
  targetWord?: string;
  onEditSentence: (id: string, text: string) => void;
}) => {
  const capitalizeFirstLetter = (text: string) => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const [isEdit, setIdEdit] = useState<string | null>(null);
  const [editSentencesValue, setEditSentencesValue] = useState<string>('');

  return (
    <ul className="list-disc flex flex-col gap-2">
      {sentences.map((sentece: ISentence, idx: number) => {
        const highlightedText = targetWord
          ? sentece.text.replace(
              new RegExp(`(${targetWord.split(' ')[1] || targetWord})`, 'gi'),
              '<b class="text-blue-500">$1</b>'
            )
          : sentece.text;

        return (
          <li className="flex items-center gap-2" key={idx}>
            <div className="border-r-2 pr-4 border-blue-500 flex gap-4">
              {isEdit === sentece.id ? (
                <Button
                  size={'sm'}
                  variant={'success'}
                  onClick={() => {
                    setIdEdit(null);
                    setEditSentencesValue('');

                    if (editSentencesValue !== sentece.text) {
                      onEditSentence(sentece.id, editSentencesValue);
                    }
                  }}
                >
                  <Save className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  size={'sm'}
                  onClick={() => {
                    setIdEdit(sentece.id);
                    setEditSentencesValue(sentece.text);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
              <Button variant={'danger'} size={'sm'} className="bg-blue-600">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            {isEdit === sentece.id ? (
              <>
                <Input
                  className="w-1/2"
                  variant={'dark'}
                  value={editSentencesValue}
                  onChange={(e) => setEditSentencesValue(e.currentTarget.value)}
                />
              </>
            ) : (
              <div
                className="flex items-center h-10"
                dangerouslySetInnerHTML={{
                  __html: capitalizeFirstLetter(highlightedText),
                }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
