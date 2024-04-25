import { FC, ReactNode, createContext, useContext } from "react";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import { Locale } from "antd/es/locale";
import { cloneDeepWith } from "lodash-es";
import { LANGUAGES } from "@/language/types";
import { THEMESNAME } from "@/store/Theme";
import { theme } from "antd";
import { MapToken } from "antd/es/theme/interface";
import { SeedToken } from "antd/es/theme/internal";
import { LanguageJsonSet, LanguageTextJson } from "@/language";
import { useAtomValue } from "jotai";
import { languageAtom } from "@/store";

export const ANTDLANGUAGETHEME: Readonly<Record<LANGUAGES, Locale>> = {
  [LANGUAGES.en]: enUS,
  [LANGUAGES.zh]: zhCN,
};

export const ANTDCOLORTHEME: Readonly<
  Record<THEMESNAME, (token: SeedToken) => MapToken>
> = {
  [THEMESNAME.dark]: theme.darkAlgorithm,
  [THEMESNAME.light]: theme.defaultAlgorithm,
};

export type TextKeys<T extends LanguageJsonSet = "Error"> = keyof typeof LanguageTextJson[T];


export type TextProtocol<T extends LanguageJsonSet> = Record<
TextKeys<T>,
  string
>;

interface Config {
  language: LANGUAGES;
  token: string;
  apiBaseUrl: string;
  useLanguage: <T extends LanguageJsonSet>(
    languageJsonName: LanguageJsonSet
  ) => TextProtocol<T>;
}

type PartialConfig = Partial<Config>;

const ConfigContext = createContext<PartialConfig>({
  language: (navigator.language.split("-")[0] as LANGUAGES) || LANGUAGES.zh,
});

type ConfigProviderProps = {
  children: ReactNode;
  config?: PartialConfig;
};

export const ConfigProvider: FC<ConfigProviderProps> = ({
  children,
  config = {},
}) => {
  const useLanguage: Config["useLanguage"] = (target) =>
    cloneDeepWith(
      LanguageTextJson[target],
      (value) => value[config.language || LANGUAGES.zh]
    );
  return (
    <ConfigContext.Provider value={{ ...{ useLanguage }, ...config }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);


type LanguageTextType<T extends LanguageJsonSet> = {LanguageText: TextProtocol<T>}

const LanguageContext= createContext<LanguageTextType<LanguageJsonSet>>(
  cloneDeepWith(LanguageTextJson.Error, (value) => value[LANGUAGES.zh])
);

export const LanguageProvider: FC<{
  children: ReactNode;
  textKey: LanguageJsonSet;
}> = ({ children, textKey }) => {
  const language = useAtomValue(languageAtom);
  return (
    <LanguageContext.Provider
      value={{
        LanguageText: cloneDeepWith(
          LanguageTextJson[textKey],
          (value) => value[language || LANGUAGES.zh]
        ),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = <T extends LanguageJsonSet, >(): LanguageTextType<T> => useContext(LanguageContext) as LanguageTextType<T>;
