import { IBase } from "@/app/types/root.types";

export interface IWord extends IBase {
  en: string;
  translate: string[];
}

export interface IWordPostDto {
  en: string;
  translate: string[];
}
