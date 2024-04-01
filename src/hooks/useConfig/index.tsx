import { FC, createContext, useContext } from "react";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import { Locale } from "antd/es/locale";
import { cloneDeepWith } from "lodash-es";
import { LANGUAGES, LanguageJson } from "@/language/types";
import { THEMESNAME } from "@/store/Theme";
import { theme } from "antd";
import { MapToken } from "antd/es/theme/interface";
import { SeedToken } from "antd/es/theme/internal";

type LanguageJsonProtocol = Record<
  string,
  LanguageJson
>;

export const ANTDLANGUAGETHEME: Readonly<Record<LANGUAGES, Locale>> = {
  [LANGUAGES.en]: enUS,
  [LANGUAGES.zh]: zhCN,
};

export const ANTDCOLORTHEME: Readonly<Record<THEMESNAME, (token: SeedToken) => MapToken>> = {
  [THEMESNAME.dark]: theme.darkAlgorithm,
  [THEMESNAME.light]: theme.defaultAlgorithm
}

type TextProtocol = Record<keyof LanguageJsonProtocol, string>;

interface Config {
  language: LANGUAGES;
  token: string;
  httpStrategy: Record<number, () => void>;
  apiBaseUrl: string;
  useLanguage: (languageJson: LanguageJsonProtocol) => TextProtocol;
}

type PartialConfig = Partial<Config>;

export const ConfigContext = createContext<PartialConfig>({language: navigator.language.split('-')[0] as LANGUAGES || LANGUAGES.zh});

type ConfigProviderProps = {
  children: React.ReactNode;
  config?: PartialConfig;
};

export const ConfigProvider: FC<ConfigProviderProps> = ({
  children,
  config = {},
}) => {
  const useLanguage: Config["useLanguage"] = (target) =>
    cloneDeepWith(target, (value) => value[config.language || LANGUAGES.zh]);
  return (
    <ConfigContext.Provider value={{ ...{ useLanguage }, ...config }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
