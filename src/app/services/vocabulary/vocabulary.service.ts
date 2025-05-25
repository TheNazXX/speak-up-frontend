import { IVocabularyItem } from '@/app/(pages)/vocabulary/model/types';
import { VocabularyType } from '@/app/(pages)/vocabulary/model/vocabularySlice';
import { axiosClassic } from '@/app/api/interceptors';
import { IResponse } from '@/app/types/root.types';

class VocabularyService {
  private BASE_URL = '/vocabulary';

  constructor() {}

  async getVocabularyType(
    vocabularyType: VocabularyType
  ): Promise<IResponse<IVocabularyItem[]>> {
    const response = await axiosClassic.get(
      this.BASE_URL + '?type=' + vocabularyType
    );
    return response;
  }
}

export const vocabularyService = new VocabularyService();
