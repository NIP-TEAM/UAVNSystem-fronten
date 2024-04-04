import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { _getBrowseColorTheme } from "./utils";

export enum THEMESNAME {
  light,
  dark,
}
const themeCoreAtom = atomWithStorage(
  "color-theme",
  _getBrowseColorTheme(),
  undefined,
  {
    getOnInit: true,
  }
);

export const themeAtom = atom(
  (get) => get(themeCoreAtom),
  (_get, set) =>
    set(
      themeCoreAtom,
      _get(themeCoreAtom) === THEMESNAME.light
        ? THEMESNAME.dark
        : THEMESNAME.light
    )
);
