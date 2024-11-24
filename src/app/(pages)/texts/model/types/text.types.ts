import { IWord } from "@/app/(pages)/words/model/types/word.types";
import { IBase } from "@/app/types/root.types";

export interface IText extends IBase {
  name: string;
  content: string;
  words: IWord[];
}
