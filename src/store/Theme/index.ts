import { atom } from "jotai"

export enum THEMESNAME {
    light,
    dark
}
const themeCoreAtom = atom(THEMESNAME.light)


export const themeAtom = atom(
    (get) => get(themeCoreAtom),
    (_get, set) => set(themeCoreAtom, _get(themeCoreAtom) === THEMESNAME.light ? THEMESNAME.dark : THEMESNAME.light)
)