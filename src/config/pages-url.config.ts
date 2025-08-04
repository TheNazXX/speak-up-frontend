import { VocabularyTypes } from '@/src/app/(pages)/vocabulary/model/vocabularySlice';

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
  VOCABULARY_CREATE = '/vocabulary/create';
  VOCABULARY_EDIT = '/vocabulary/edit';
  VOCABULARY_REPEAT = '/vocabulary/repeat';
  VOCABULARY_REPEAT_SESSION = '/vocabulary/repeat/session';

  VOCABULARY_WORDS = `/vocabulary?type=${VocabularyTypes.WORDS}`;
  VOCABULARY_PHRASES = `/vocabulary?type=${VocabularyTypes.PHRASES}`;
}

export const DASHBOARD_PAGES = new DASHBOARD();
