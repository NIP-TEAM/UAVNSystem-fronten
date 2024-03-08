import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import { Locale } from "antd/es/locale";

export enum LANGUAGES {
    en,
    zh
}

export const ANTDLANGUAGETHEME: Readonly<{[key: string]: Locale}> = {
    [LANGUAGES.en]: enUS,
    [LANGUAGES.zh]: zhCN
}

type LanguageJsonProtocol = Record<string, {
    zh: string,
    en: string
}>

export const getAntdLanguageTheme = (language: keyof typeof ANTDLANGUAGETHEME) => ANTDLANGUAGETHEME[language] || ANTDLANGUAGETHEME[LANGUAGES.zh]