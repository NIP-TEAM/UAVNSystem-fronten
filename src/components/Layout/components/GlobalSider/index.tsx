import { Layout, Menu } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { SiderStyle } from "./style";
import { RouteItem, routes } from "../../../../router";
import { useNavigate } from "react-router";

interface GlobalSiderProp {
  collapse: boolean;
  background: string;
}



export const GlobalSider: FC<GlobalSiderProp> = ({ collapse, background }) => {
  const navigate = useNavigate();
  console.log(routes)

  return (
    <Layout.Sider
      style={{ ...SiderStyle, background }}
      trigger={null}
      collapsible
      collapsed={collapse}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[]}
      />
    </Layout.Sider>
  );
};
