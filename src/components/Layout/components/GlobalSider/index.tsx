import { Layout } from "antd";
import { FC } from "react";
import { SiderStyle } from "./style";

interface GlobalSiderProp {}

export const GlobalSider: FC<GlobalSiderProp> = () => {
  return (
    <Layout.Sider width={200} breakpoint="sm" style={SiderStyle}>
      Sider
    </Layout.Sider>
  );
};
