import { FC, ReactNode } from "react";
import { RouteItem } from "../../router";
import { Button, Flex, Layout } from "antd";
import { LoginLayoutStyle } from "./style";
import { LanguageSwitch } from "..";
import { TranslationOutlined } from "@ant-design/icons";
import { GlobalHeader, GlobalSider } from "./components";

interface AppLayoutProp {
  routes: RouteItem[];
  pageType?: "noFrame" | "frame";
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProp> = ({ children, pageType }) => {
  return pageType === "frame" ? (
    <Layout hasSider>
      <GlobalSider />
      <Layout>
        <GlobalHeader />
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  ) : (
    <Layout.Content style={LoginLayoutStyle}>
      <div>
        {children}
        <Flex justify="center">
          <LanguageSwitch>
            <Button
              type="link"
              icon={<TranslationOutlined />}
              title="Switch language"
            />
          </LanguageSwitch>
        </Flex>
      </div>
    </Layout.Content>
  );
};
