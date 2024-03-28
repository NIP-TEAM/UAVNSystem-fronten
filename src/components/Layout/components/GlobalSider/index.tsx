import { Layout, Menu } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { SiderStyle } from "./style";
import { routes } from "../../../../router";
import { useLocation, useNavigate } from "react-router";
import { RouteItem } from "../../../../router/types";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";

interface GlobalSiderProp {
  collapse: boolean;
  background: string;
}

type MenuItem = ItemType<MenuItemType>


export const GlobalSider: FC<GlobalSiderProp> = ({ collapse, background }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("111");
  }, [location.pathname]);

  const MenuItems: MenuItem[] = useMemo(() => {
    const handleLinkTo = (target: string) => {
      navigate(target);
    };
    const formateMenuItem = ({
      id,
      icon,
      text,
      path,
      children,
    }: RouteItem): MenuItem => ({
      key: id,
      icon,
      label: text,
      children: children?.map((item) => formateMenuItem(item)),
      onClick: () => {
        handleLinkTo(path)
      },
    });
    return routes.filter(({text}) => !!text).map(item => formateMenuItem(item))
  },
    [navigate]
  );

  console.log(MenuItems)

  return (
    <Layout.Sider
      style={{ ...SiderStyle, background }}
      trigger={null}
      collapsible
      collapsed={collapse}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[MenuItems[0]?.key?.toString() || 'dashboard']}
        items={MenuItems}
      />
    </Layout.Sider>
  );
};
