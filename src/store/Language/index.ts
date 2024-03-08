import { atom } from "jotai"
import { LANGUAGES } from "../../hooks"

export const a = 1

const languageCoreAtom = atom(LANGUAGES.zh)


export const languageAtom = atom(
    (get) => get(languageCoreAtom),
    (get, set, newValue: LANGUAGES) => set(languageCoreAtom, newValue)
)