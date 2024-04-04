import { THEMESNAME } from "."

export const _getBrowseColorTheme = (): THEMESNAME => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) return THEMESNAME.dark
    if(window.matchMedia('(prefers-color-scheme: light)').matches) return THEMESNAME.light
    return THEMESNAME.light
}
