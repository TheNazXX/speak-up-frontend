import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateString(str: string, symbols: number): string {
  if (str.length <= symbols) {
    return str;
  }
  return str.substring(0, symbols) + '...';
}
