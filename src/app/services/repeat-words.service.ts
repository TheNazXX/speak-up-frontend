import { IWord } from '../(pages)/words/model/types/word.types';
import { axiosClassic } from '../api/interceptors';
import { IRepeatWord } from '../types/repeat-words';
import { IResponse } from '../types/root.types';

class RepeatWordsService {
  private BASE_URL = '/repeat-words';

  public async getAll(): Promise<IResponse<IWord[]>> {
    const response = await axiosClassic.get(this.BASE_URL);
    return response.data;
  }

  public async deleteAll() {
    const response = await axiosClassic.delete(`${this.BASE_URL}/all`);
    return response;
  }

  public async postIncorrectWords(words: IRepeatWord[]) {
    const response = await axiosClassic.post(
      `${this.BASE_URL}/incorrect-words`,
      words
    );

    return response;
  }

  public async getDailyRepeatWords(): Promise<IResponse<IRepeatWord[]>> {
    const response = await axiosClassic(`${this.BASE_URL}/daily`);
    return response.data;
  }

  public async postCorrectWordsIdx(
    data: string[]
  ): Promise<IResponse<IRepeatWord[]>> {
    const response = await axiosClassic.post(`${this.BASE_URL}/correct`, {
      idx: data,
    });
    return response.data;
  }

  async postWords(idx: string[]) {
    const response = await axiosClassic.post(this.BASE_URL, { idx });
    return response;
  }
}

export const repeatWordsService = new RepeatWordsService();
