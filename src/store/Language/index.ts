import { atom } from "jotai"
import { LANGUAGES } from "../../hooks"

const languageCoreAtom = atom(LANGUAGES.zh)


export const languageAtom = atom(
    (get) => get(languageCoreAtom),
    (_, set, newValue: LANGUAGES) => set(languageCoreAtom, newValue)
)