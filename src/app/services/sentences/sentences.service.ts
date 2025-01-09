import { ISentence } from '@/app/(pages)/words/model/types/sentence.types';
import { axiosClassic } from '@/app/api/interceptors';
import { IResponse } from '@/app/types/root.types';

class SentencesService {
  private BASE_URL = '/sentences';

  async create(text: string, wordId?: string) {
    return;
  }

  async update(id: string, text: string) {
    const response = await axiosClassic.patch(`${this.BASE_URL}/${id}`, {
      text,
    });
    return response.data;
  }

  async getByWord(en: string) {
    const response = await axiosClassic.get(`${this.BASE_URL}/word?en=${en}`);
    return response;
  }

  async getByPhrase(en: string) {
    const response = await axiosClassic.get(`${this.BASE_URL}/phrase?en=${en}`);
    return response;
  }

  async delete(id: string): Promise<ISentence> {
    const response = await axiosClassic.delete(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}

export const sentencesService = new SentencesService();
