import { axiosClassic } from '@/app/api/interceptors';
import { IPhrase, IPostPhraseDto } from '../types/phrase.types';
import { IResponse } from '@/app/types/root.types';

class PhrasesService {
  private BASE_URL = '/phrases';

  async create(data: IPostPhraseDto) {
    const response = await axiosClassic.post(this.BASE_URL, data);
    return response.data;
  }

  async getAll(): Promise<IResponse<IPhrase[]>> {
    const response = await axiosClassic(this.BASE_URL);
    return response.data;
  }

  async get(en: string): Promise<IResponse<IPhrase>> {
    const response = await axiosClassic.get(`${this.BASE_URL}/${en}`);
    return response.data;
  }

  async update(en: string, data: IPostPhraseDto) {
    const response = await axiosClassic.patch(`${this.BASE_URL}/${en}`, data);
    return response;
  }

  async addSentences(en: string, sentence: string) {
    const response = await axiosClassic.post(
      `${this.BASE_URL}/${en}/sentence`,
      {
        sentence,
      }
    );
    return response.data;
  }

  async delete(en: string) {
    const response = await axiosClassic.delete(`${this.BASE_URL}/${en}`);
    return response.data;
  }
}

export const phrasesService = new PhrasesService();
