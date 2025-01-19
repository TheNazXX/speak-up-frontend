import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { IMenuItem } from './menu.interface';
import { BookAudio, Boxes, SquareUser, Text } from 'lucide-react';

export const MenuData: IMenuItem[] = [
  {
    label: 'Vocabulary',
    url: DASHBOARD_PAGES.VOCABULARY,
    icon: BookAudio,
  },
];
