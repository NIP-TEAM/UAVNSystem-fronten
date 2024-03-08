import { atom } from "jotai"
import { LANGUAGES } from "../../hooks"

export const a = 1

const languageCoreAtom = atom('language', LANGUAGES.zh)