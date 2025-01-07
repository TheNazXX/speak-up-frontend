import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { IMenuItem } from './menu.interface';
import { BookAudio, Boxes, SquareUser, Text } from 'lucide-react';

export const MenuData: IMenuItem[] = [
  {
    label: 'Words',
    url: DASHBOARD_PAGES.WORDS,
    icon: BookAudio,
  },
  {
    label: 'Phrases',
    url: DASHBOARD_PAGES.PHRASES,
    icon: BookAudio,
  },
];
