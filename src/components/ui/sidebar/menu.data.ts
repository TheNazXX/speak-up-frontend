import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { IMenuItem } from './menu.interface';
import { BookAudio, Boxes, SquareUser, Text } from 'lucide-react';
import { VocabularyType } from '@/app/(pages)/vocabulary/model/vocabularySlice';

export const VOCABULARY_TYPE_DEFAULT_SEARCH_PARAMS = `?type=${VocabularyType.WORDS}`;

export const MenuData: IMenuItem[] = [
  {
    label: 'Vocabulary',
    url: DASHBOARD_PAGES.VOCABULARY + VOCABULARY_TYPE_DEFAULT_SEARCH_PARAMS,
    icon: BookAudio,
  },
  {
    label: 'Texts',
    url: DASHBOARD_PAGES.TEXTS,
    icon: Text,
  },
];
