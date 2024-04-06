import { FC, ReactNode } from "react";
import { LANGUAGES } from "@/language/types";
import { Button, Dropdown, Popover } from "antd";
import { useAtom } from "jotai";
import { languageAtom } from "@/store";
import { DownOutlined } from "@ant-design/icons";

const languageSet: readonly {key: LANGUAGES, label: string}[] = [
  { key: LANGUAGES.en, label: "English" },
  { key: LANGUAGES.zh, label: "简体中文" },
];

export interface LanguageSwitchProp {
  children: ReactNode;
}

export const LanguageSwitch: FC<LanguageSwitchProp> = ({ children }) => {
  const [language, setLanguage] = useAtom(languageAtom);
  const languageChooser = (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: [...languageSet],
        selectedKeys: [language],
        onClick: ({ key }) => setLanguage(key as LANGUAGES),
      }}
    >
      <Button type="link">
        {languageSet?.find(({ key }) => key === language)?.label} <DownOutlined />
      </Button>
    </Dropdown>
  );

  return (
    <Popover trigger="click" content={languageChooser} placement="bottom">
      {children}
    </Popover>
  );
};
