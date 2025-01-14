import { Brush, Edit, Save, Trash2 } from 'lucide-react';
import Button from '../ui/button/Button';
import { useEffect, useState } from 'react';
import { ISentence } from '@/app/(pages)/words/model/types/sentence.types';
import Input from '../ui/input/Input';
import { Plus } from 'lucide-react';
import Loader from '../ui/loader/Loader';

export const SentencesEditForm = ({
  sentences,
  targetWord,
  isFetch,
  onEditSentence,
  onDeleteSentence,
  onAddSentence,
}: {
  sentences: ISentence[];
  targetWord?: string;
  isFetch: boolean;
  onEditSentence: (id: string, text: string) => void;
  onDeleteSentence: (id: string) => void;
  onAddSentence: (text: string) => void;
}) => {
  const capitalizeFirstLetter = (text: string) => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const [isAddingSentence, setIsAddingSentence] = useState<boolean>(false);
  const [addingSentenceValue, setAddingSentenceValue] = useState<string>('');

  const [isEdit, setIdEdit] = useState<string | null>(null);
  const [editSentencesValue, setEditSentencesValue] = useState<string>('');

  const [isLocalLoading, setIsLocalLoading] = useState<string>('');
  const [isAddingLoading, setIsAddingLoading] = useState(false);

  useEffect(() => {
    if (!isFetch) {
      setIsLocalLoading('');
      setIsAddingLoading(false);
    }
  }, [isFetch]);

  return (
    <>
      <div className="flex gap-2 items-center mb-4">
        {isAddingLoading ? null : (
          <>
            {isAddingSentence ? (
              <Button
                size={'sm'}
                variant={'success'}
                onClick={() => {
                  setIsAddingSentence(false);
                  onAddSentence(addingSentenceValue);
                  setAddingSentenceValue('');
                  setIsAddingLoading(true);
                }}
              >
                <Save className="w-4 h-4" />
              </Button>
            ) : (
              <Button size={'sm'} onClick={() => setIsAddingSentence(true)}>
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </>
        )}

        {isAddingLoading ? null : (
          <>
            {isAddingSentence ? (
              <Input
                className="w-1/2"
                variant={'dark'}
                value={addingSentenceValue}
                onChange={(e) => setAddingSentenceValue(e.target.value)}
              />
            ) : (
              <div className="h-10 flex items-center">Add sentece</div>
            )}
          </>
        )}
      </div>
      <ul className="list-disc flex flex-col gap-2">
        {sentences.map((sentece: ISentence, idx: number) => {
          const highlightedText = targetWord
            ? sentece.text.replace(
                new RegExp(`(${targetWord.split(' ')[1] || targetWord})`, 'gi'),
                '<b class="text-blue-500">$1</b>'
              )
            : sentece.text;

          return (
            <li className="flex items-center gap-2 text-[14px]" key={idx}>
              {isLocalLoading === sentece.id ? (
                <Loader />
              ) : (
                <>
                  <div className="border-r-2 pr-4 border-blue-500 flex gap-4">
                    {isEdit === sentece.id ? (
                      <Button
                        size={'sm'}
                        variant={'success'}
                        onClick={() => {
                          setIdEdit(null);
                          setEditSentencesValue('');
                          setIsLocalLoading(sentece.id);

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
                    <Button
                      onClick={() => {
                        onDeleteSentence(sentece.id);
                        setIsLocalLoading(sentece.id);
                      }}
                      variant={'danger'}
                      size={'sm'}
                      className="bg-blue-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
              {isEdit === sentece.id ? (
                <>
                  <Input
                    className="w-1/2"
                    variant={'dark'}
                    value={editSentencesValue}
                    onChange={(e) =>
                      setEditSentencesValue(e.currentTarget.value)
                    }
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
    </>
  );
};
