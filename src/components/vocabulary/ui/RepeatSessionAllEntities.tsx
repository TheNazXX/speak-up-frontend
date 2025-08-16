import { IVocabularyItem } from '@/src/app/entities/vocabularly/model/types';
import Button from '@/src/components/ui/button/Button';
import Input from '@/src/components/ui/input/Input';
import { set } from 'date-fns';
import { useEffect, useState } from 'react';

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';

interface IRepeatSessionAllEntitiesProps {
  handleEndSession: () => void;
  entities: IVocabularyItem[];
  correctEnities: IVocabularyItem[];
  handleEntity: (
    entity: IVocabularyItem,
    type: 'correct' | 'incorrect'
  ) => void;
}

export const RepeatSessionAllEntities = ({
  entities,
  handleEntity,
  handleEndSession,
  correctEnities,
}: IRepeatSessionAllEntitiesProps) => {
  const [filteredEntities, setFilteredEntities] = useState<IVocabularyItem[]>(
    entities.filter(
      (initialEntity) =>
        !correctEnities.find(
          (currectEntity) => currectEntity.en === initialEntity.en
        )
    )
  );
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [answers, setAnswers] = useState<
    Record<
      number,
      {
        en: string;
        ua: string;
        isCorrect?: boolean;
      }
    >
  >({});

  const submit = () => {
    handleEndSession();

    filteredEntities.forEach((initialEntity) => {
      if (
        !correctEnities.find(
          (correctEnitiy) => correctEnitiy.en === initialEntity.en
        )
      ) {
        handleEntity(initialEntity, 'incorrect');
      }
    });
  };

  const reset = () => {
    setIsCheck(false);

    setFilteredEntities((prev) =>
      prev.filter(
        (initialEntity) =>
          !correctEnities.find(
            (correctEntity) => initialEntity.en === correctEntity.en
          )
      )
    );

    setAnswers({});
  };

  const checkAnswers = () => {
    setIsCheck(true);

    Object.entries(answers).forEach(([index, answer]) => {
      const initialEntity = filteredEntities.find(
        (item) => item.en === answer.en
      );

      if (
        initialEntity &&
        isCorrectTranslate(answer.ua, initialEntity.translate)
      ) {
        setAnswers((prev) => ({
          ...prev,
          [index]: {
            ...answer,
            isCorrect: true,
          },
        }));
        handleEntity(initialEntity, 'correct');
      }
    });
  };

  const isCorrectTranslate = (str: string, array: string[]) => {
    const checkTranslate = str
      .split(', ')
      .map((w) => w.trim())
      .filter((s) => s.length > 0);

    if (checkTranslate.length !== array.length) {
      return false;
    }

    const sorted1 = [...checkTranslate].sort();
    const sorted2 = [...array].sort();
    return sorted1.every((w, i) => w === sorted2[i]);
  };

  return (
    <div className="w-full">
      {!!correctEnities.length && (
        <div className="flex gap-2 mb-8">
          {correctEnities.map((item) => (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <span className='className="text-white px-2.5 py-1.5 bg-primary border border-green-600 rounded-xl leading-4 hover:opacity-60 transition-opacity text-[15px] relative whitespace-nowrapm"'>
                    {' '}
                    {item.en}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="bg-black rounded-2xl text-[12px] py-1 px-3">
                  <p>{item.translate?.join(', ')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      )}
      <div className="flex gap-10">
        <div className="w-1/2">
          {filteredEntities.map((entity, index) => {
            return (
              <div key={entity.en} className="flex gap-2 mb-4 items-center">
                <span className="w-10">{index + 1}.</span>
                <Input
                  disabled={isCheck}
                  value={answers[index]?.en || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    const prevValue = answers[index]?.ua || '';

                    setAnswers((prev) => ({
                      ...prev,
                      [index]: {
                        en: value,
                        ua: prevValue,
                      },
                    }));
                  }}
                  className={`w-full ${
                    isCheck
                      ? answers[index]?.isCorrect
                        ? 'border-b-green-700'
                        : 'border-b-red-700'
                      : ''
                  }`}
                  variant={'dark'}
                />
                <span>-</span>
                <Input
                  disabled={isCheck}
                  value={answers[index]?.ua || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    const prevValue = answers[index]?.en || '';

                    setAnswers((prev) => ({
                      ...prev,
                      [index]: {
                        en: prevValue,
                        ua: value,
                      },
                    }));
                  }}
                  className={`w-full ${
                    isCheck
                      ? answers[index]?.isCorrect
                        ? 'border-b-green-700'
                        : 'border-b-red-700'
                      : ''
                  }`}
                  variant={'dark'}
                />
              </div>
            );
          })}
        </div>
        <div className="0">
          {isCheck &&
            entities
              .filter(
                (initial) =>
                  !correctEnities.find((current) => current.en === initial.en)
              )
              .map((item) => {
                return (
                  <div className="flex gap-2 text-gray mb-2" key={item.en}>
                    <span className="text-[#fff]">{item.en}</span>
                    <span>-</span>
                    <span>{item.translate.join(', ')}</span>
                  </div>
                );
              })}
        </div>
      </div>

      {!isCheck && (
        <Button
          onClick={() => checkAnswers()}
          type="button"
          className="w-full mt-4"
        >
          Check Answers
        </Button>
      )}
      {isCheck && (
        <div className="flex gap-2">
          <Button onClick={() => submit()} type="button" className="w-1/4 mt-4">
            Submit
          </Button>
          <Button onClick={() => reset()} type="button" className="w-1/4 mt-4">
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};
