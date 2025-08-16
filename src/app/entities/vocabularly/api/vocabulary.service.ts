import {
  IVocabularyItem,
  IVocabularyPostDto,
} from '@/src/app/entities/vocabularly/model/types';
import { VocabularyTypes } from '@/src/app/entities/vocabularly/model/vocabularySlice';
import { axiosClassic } from '@/src/app/api/interceptors';
import { IResponse } from '@/src/app/types/root.types';

class VocabularyService {
  private BASE_URL = '/vocabulary';

  constructor() {}

  async getVocabulary(
    vocabularyType?: VocabularyTypes | null,
    createdAt?: string,
    repeatedAt?: string
  ): Promise<IResponse<IVocabularyItem[]>> {
    const params = new URLSearchParams();

    if (vocabularyType) params.append('type', vocabularyType);
    if (createdAt) params.append('createdAt', createdAt);
    if (repeatedAt) params.append('repeatedAt', repeatedAt);

    const response = await axiosClassic.get(
      `${this.BASE_URL}?${params.toString()}`
    );

    return response;
  }

  async create(
    data: IVocabularyPostDto
  ): Promise<IResponse<IVocabularyItem>> {
    const response = await axiosClassic.post(this.BASE_URL, data);
    return response.data;
  }

  async update(en: string,
    data: IVocabularyPostDto
  ): Promise<IResponse<IVocabularyItem>> {
    const response = await axiosClassic.patch(`${this.BASE_URL}/${en}`, data);
    return response.data;
  }

  async getVocabularyDates(
    datesType: 'created-dates' | 'repeated-dates',
    vocabularyType?: VocabularyTypes | null
  ): Promise<IResponse<string[]>> {
    const params = new URLSearchParams();

    if (vocabularyType) {
      params.append('type', vocabularyType);
    }

    const response = await axiosClassic.get(
      `${this.BASE_URL}/${datesType}?${params.toString()}`
    );

    return response.data;
  }

  async getVocabularyByEn(
    en: string
  ): Promise<IResponse<IVocabularyItem>> {

    const response = await axiosClassic.get(
      `${this.BASE_URL}/${en}`
    );

    return response;
  }

  async updateVocabularyRepeating(data: IVocabularyItem[]): Promise<IResponse<IVocabularyItem[]>> {
    const response = await axiosClassic.patch(`${this.BASE_URL}/repeating`, data);
    return response.data;
  }

}

export const vocabularyService = new VocabularyService();
