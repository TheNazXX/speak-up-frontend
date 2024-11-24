import { IPostText } from "../(pages)/texts/components/TextsCreate";
import { IText } from "../(pages)/texts/model/types/text.types";
import { IWord } from "../(pages)/words/model/types/word.types";
import { axiosClassic } from "../api/interceptors";
import { IResponse } from "../types/root.types";

class TextService {
  private BASE_URL = "/texts";

  async create(data: IPostText, words?: IWord[]) {
    const response = await axiosClassic.post(this.BASE_URL, { data, words });
    return response;
  }

  async getAll(): Promise<IResponse<IText[]>> {
    const response = await axiosClassic.get(this.BASE_URL);
    return response.data;
  }

  async getByName(name: string): Promise<IResponse<IText>> {
    const response = await axiosClassic.get(`${this.BASE_URL}/${name}`);
    return response.data;
  }
}

export const textService = new TextService();
