import {
  IVocabularyItem,
  IVocabularyPostDto,
} from '@/app/(pages)/vocabulary/model/types';
import { VocabularyTypes } from '@/app/(pages)/vocabulary/model/vocabularySlice';
import { axiosClassic } from '@/app/api/interceptors';
import { IResponse } from '@/app/types/root.types';

class VocabularyService {
  private BASE_URL = '/vocabulary';

  constructor() {}

  async getVocabularyType(
    vocabularyType: VocabularyTypes
  ): Promise<IResponse<IVocabularyItem[]>> {
    const response = await axiosClassic.get(
      this.BASE_URL + '?type=' + vocabularyType
    );
    return response;
  }

  async createVocabulary(
    data: IVocabularyPostDto
  ): Promise<IResponse<IVocabularyItem>> {
    const response = await axiosClassic.post(this.BASE_URL, data);
    return response.data;
  }
}

export const vocabularyService = new VocabularyService();
