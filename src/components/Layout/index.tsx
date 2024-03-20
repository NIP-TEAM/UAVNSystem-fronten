import { FC, ReactNode } from "react";
import { RouteItem } from "../../router";
import { Flex, Layout } from "antd";
import { LanguageSwitchStyle, LoginLayoutStyle } from "./style";
import { LanguageSwitch } from "..";
import { TranslationOutlined } from "@ant-design/icons";

interface AppLayoutProp {
  routes: RouteItem[];
  pageType?: "noFrame" | "frame";
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProp> = ({ children, pageType }) => {
  return pageType === "frame" ? (
    <div>111{children}</div>
  ) : (
    <Layout.Content style={LoginLayoutStyle}>
      <div>
        {children}
        <Flex justify="center">
          <LanguageSwitch>
            <TranslationOutlined style={LanguageSwitchStyle} title="Swith language"/>
          </LanguageSwitch>
        </Flex>
      </div>
    </Layout.Content>
  );
};
