import { Layout, Menu } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { SiderStyle } from "./style";
import { routes } from "../../../../router";
import { useNavigate } from "react-router";
import { RouteItem } from "../../../../router/types";

interface GlobalSiderProp {
  collapse: boolean;
  background: string;
}




export const GlobalSider: FC<GlobalSiderProp> = ({ collapse, background }) => {
  const navigate = useNavigate();
  console.log(routes)

  const formateMenuItem = ({id, icon, text, path}: RouteItem) => ({
    key: id,
    icon,
    label: text,
    onClick: ({
      keyPath,
    }: { keyPath: string}) => {
      handleLinkTo(`/${keyPath[0]}` || path)
    },
  })

  const handleLinkTo = (target: string) => {
    navigate(target)
  }

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
