import { IPostText } from '../components/texts/TextPageCreate';
import { IText } from '../(pages)/texts/model/types/text.types';
import { IWord } from '../(pages)/words/model/types/word.types';
import { axiosClassic } from '../api/interceptors';
import { IResponse } from '../types/root.types';

class TextService {
  private BASE_URL = '/texts';

  async create(data: IPostText) {
    const response = await axiosClassic.post(this.BASE_URL, data);
    return response;
  }

  async update(id: string, data: IPostText) {
    const response = await axiosClassic.patch(`${this.BASE_URL}/${id}`, data);
    return response.data;
  }

  async getAll(): Promise<IResponse<IText[]>> {
    const response = await axiosClassic.get(this.BASE_URL);
    return response.data;
  }

  async getByTitle(title: string): Promise<IResponse<IText[]>> {
    const response = await axiosClassic.get(`${this.BASE_URL}/${title}`);
    return response.data;
  }
}

export const textService = new TextService();
