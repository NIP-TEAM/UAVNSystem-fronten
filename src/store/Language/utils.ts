import { LANGUAGES } from "@/language/types";

export const _getBrowseLanguage = (): LANGUAGES => {
    switch (navigator.language) {
        case 'zh-CN': return LANGUAGES.zh
        default:
            LANGUAGES.en;
    }
    return LANGUAGES.en;
}