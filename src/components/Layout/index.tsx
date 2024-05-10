import { FC, ReactNode, useState } from "react";
import { Button, Layout, theme } from "antd";
import { LoginLayoutStyle } from "./style";
import { LanguageSwitch } from "@/components";
import { TranslationOutlined } from "@ant-design/icons";
import { GlobalHeader, GlobalSider } from "./components";

interface AppLayoutProp {
  pageType?: "noFrame" | "frame";
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProp> = ({ children, pageType }) => {
  const [collapse, setCollapse] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return pageType === "frame" ? (
    <Layout hasSider style={{overflowY: 'auto', minWidth: '1500px'}}>
      <GlobalSider {...{ collapse, background: colorBgContainer }} />
      <Layout>
        <GlobalHeader
          {...{ collapse, setCollapse, background: colorBgContainer }}
        />
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  ) : (
    <Layout style={LoginLayoutStyle}>
      {children}
      <LanguageSwitch>
        <Button
          type="link"
          icon={<TranslationOutlined />}
          title="Switch language"
        />
      </LanguageSwitch>
    </Layout>
  );
};
