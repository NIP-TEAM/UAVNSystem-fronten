import { FC, ReactNode, useState } from "react";
import { RouteItem } from "@/router/types";
import { Button, Flex, Layout, theme } from "antd";
import { LoginLayoutStyle } from "./style";
import { LanguageSwitch } from "@/components";
import { TranslationOutlined } from "@ant-design/icons";
import { GlobalHeader, GlobalSider } from "./components";

interface AppLayoutProp {
  routes: RouteItem[];
  pageType?: "noFrame" | "frame";
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProp> = ({ children, pageType }) => {
  const [collapse, setCollapse] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return pageType === "frame" ? (
    <Layout hasSider>
      <GlobalSider {...{ collapse, background: colorBgContainer }} />
      <Layout>
        <GlobalHeader
          {...{ collapse, setCollapse, background: colorBgContainer }}
        />
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
