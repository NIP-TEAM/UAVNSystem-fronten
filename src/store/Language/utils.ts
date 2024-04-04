import { LANGUAGES } from "@/language/types";

const _getBrowseLanguage = (): LANGUAGES => {
    console.log(navigator.language)
    return LANGUAGES.zh
}