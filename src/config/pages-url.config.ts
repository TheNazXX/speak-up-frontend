import { VocabularyTypes } from '@/app/(pages)/vocabulary/model/vocabularySlice';

class DASHBOARD {
  private root = '';

  HOME = '/';
  PROFILE = `/profile`;
  WORDS = `/words`;
  WORDS_CREATE = '/words/create';
  WORDS_EDIT = '/words/edit';
  UNITS = `/units`;
  TEXTS = `/texts`;
  TEXTS_CREATE = '/texts/create';
  TEXTS_EDIT = '/texts/edit';
  REPEAT_WORDS = '/repeat-words';
  EXPRESSIONS = '/expressions';

  PHRASES = '/phrases';
  PHRASES_CREATE = '/phrases/create';
  PHRASES_EDIT = '/phrases/edit';
  REPEAT_PHRASES = '/repeat-phrases';

  VOCABULARY = '/vocabulary';
  VOCABULARY_WORDS = `/vocabulary?type=${VocabularyTypes.WORDS}`;
  VOCABULARY_PHRASES = `/vocabulary?type=${VocabularyTypes.PHRASES}`;
}

export const DASHBOARD_PAGES = new DASHBOARD();
