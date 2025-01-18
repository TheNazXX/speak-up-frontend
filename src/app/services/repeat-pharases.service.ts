import axios from 'axios';
import { IRepeatPhrase } from '../(pages)/repeat-phrases/model/types/repeat-phrases.types';
import { IResponse } from '../types/root.types';
import { axiosClassic } from '../api/interceptors';

class RepeatPhrasesService {
  private readonly BASE_URL = '/repeat-phrases';

  async getAll() {}

  async getDailyPhrases(): Promise<IResponse<IRepeatPhrase[]>> {
    const response = await axiosClassic.get(`${this.BASE_URL}/daily`);
    return response.data;
  }
}

export const repeatPhrasesService = new RepeatPhrasesService();
