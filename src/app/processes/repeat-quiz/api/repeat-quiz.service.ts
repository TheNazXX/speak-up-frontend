import {
  IVocabularyItem,
} from '@/src/app/entities/vocabularly/model/types';
import { axiosClassic } from '@/src/app/api/interceptors';
import { IResponse } from '@/src/app/types/root.types';

class RepeatQuizService {
  private BASE_URL = '/vocabulary/repeating/quiz';

  constructor() {}

  async getVocabularyRepeatingQuiz(count: number = 5): Promise<IResponse<IVocabularyItem[]>>{
    const response = await axiosClassic.get(`${this.BASE_URL}?count=${count}`,);
    return response.data;
  }
}

export const repeatQuizService = new RepeatQuizService();
