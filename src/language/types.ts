export enum LANGUAGES {
    en = "en",
    zh = "zh",
  }

export type LanguageJson = Record<LANGUAGES, string>


export interface ErrorMessage extends LanguageJson {}