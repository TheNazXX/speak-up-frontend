import { IWord } from "../(pages)/words/model/types/word.types";
import { axiosClassic } from "../api/interceptors";
import { IResponse } from "../types/root.types";

class RepeatWordsService {
  private BASE_URL = "/repeat-words";

  public async getAll(): Promise<IResponse<IWord[]>> {
    const response = await axiosClassic.get(this.BASE_URL);
    return response.data;
  }

  public async deleteAll() {
    const response = await axiosClassic.delete(`${this.BASE_URL}/all`);
    return response;
  }
}

export const repeatWordsService = new RepeatWordsService();
