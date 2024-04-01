import { FC, ReactNode } from "react";
import { LANGUAGES } from "@/language/types";
import { Popover, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useAtom } from "jotai";
import { languageAtom } from "@/store";

const languageSet: DefaultOptionType[] = [
  { value: LANGUAGES.en, label: "English" },
  { value: LANGUAGES.zh, label: "简体中文" },
];

export interface LanguageSwitchProp {
  children: ReactNode;
}

export const LanguageSwitch: FC<LanguageSwitchProp> = ({ children }) => {
  const [language, setLanguage] = useAtom(languageAtom);
  const languageChooser = (
    <Select
      options={languageSet}
      value={language}
      onChange={(newLanguage) => setLanguage(newLanguage)}
    />
  );

  return (
    <Popover trigger="click" content={languageChooser} placement="bottom">
      {children}
    </Popover>
  );
};
