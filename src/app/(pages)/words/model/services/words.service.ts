import { axiosClassic } from '@/app/api/interceptors';
import { IResponse } from '@/app/types/root.types';
import { IWord, IWordPostDto } from '../types/word.types';

class WordsService {
  private BASE_URL = '/words';

  async get(slug: string) {
    const response = await axiosClassic.get<IResponse<IWord>>(
      `${this.BASE_URL}/${slug}`
    );

    return response.data;
  }

  async getAll() {
    const response = await axiosClassic.get<IResponse<IWord[]>>(this.BASE_URL);
    return response.data;
  }

  async create(data: IWordPostDto) {
    const response = await axiosClassic.post<IResponse<IWord>>(this.BASE_URL, {
      ...data,
    });
    return response.data;
  }

  async update(en: string, data: IWordPostDto) {
    const response = await axiosClassic.patch<IResponse<IWord>>(
      `${this.BASE_URL}/${en}`,
      {
        ...data,
      }
    );

    return response.data;
  }

  async deleteByEn(en: string) {
    const response = await axiosClassic.delete(`${this.BASE_URL}/${en}`);
    return response.data;
  }
}

export const wordsService = new WordsService();
