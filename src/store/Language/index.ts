import { atom } from "jotai";
import { LANGUAGES } from "@/language/types";
import { atomWithStorage } from "jotai/utils";
import { _getBrowseLanguage } from "./utils";

const languageCoreAtom = atomWithStorage(
  "user-language",
  _getBrowseLanguage(),
  undefined,
  {
    getOnInit: true,
  }
);

export const languageAtom = atom(
  (get) => get(languageCoreAtom),
  (_, set, newValue: LANGUAGES) => set(languageCoreAtom, newValue)
);
