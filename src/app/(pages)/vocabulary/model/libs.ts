import { format } from 'date-fns';
import { IVocabularyByDate, IVocabularyItem } from './types';

export const transformVocabularyByDate = (
  data: IVocabularyItem[]
): IVocabularyByDate => {
  const phrasesSortedByDate: IVocabularyByDate = {};

  data.forEach((item: IVocabularyItem) => {
    const date = format(new Date(item.createdAt), 'yyyy-MM-dd');
    if (!phrasesSortedByDate[date]) {
      phrasesSortedByDate[date] = [item];
    } else {
      phrasesSortedByDate[date].push(item);
    }
  });

  const sortedData = Object.keys(phrasesSortedByDate)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .reduce((acc: IVocabularyByDate, date: string) => {
      acc[date] = phrasesSortedByDate[date];
      return acc;
    }, {});

  return sortedData;
};
