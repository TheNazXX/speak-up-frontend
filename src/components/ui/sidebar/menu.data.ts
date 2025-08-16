import { DASHBOARD_PAGES } from '@/src/config/pages-url.config';
import { IMenuItem } from './menu.interface';
import { BookAudio, BookType, Boxes, SquareUser, Text } from 'lucide-react';
import { VocabularyTypes } from '@/src/app/entities/vocabularly/model/vocabularySlice';

export const VOCABULARY_TYPE_DEFAULT_SEARCH_PARAMS = `?type=${VocabularyTypes.WORDS}`;

export const MenuData: IMenuItem[] = [
  {
    label: 'Vocabulary',
    url: DASHBOARD_PAGES.VOCABULARY + VOCABULARY_TYPE_DEFAULT_SEARCH_PARAMS,
    icon: BookAudio,
  },
  {
    label: 'Texts',
    url: DASHBOARD_PAGES.TEXTS,
    icon: BookType,
  },
];
