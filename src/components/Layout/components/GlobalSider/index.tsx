import { Layout, Menu } from "antd";
import { FC, ReactNode, useEffect, useState } from "react";
import { SiderStyle } from "./style";
import { flatRoutes, routes } from "@/router";
import { useLocation, useNavigate } from "react-router";
import { RouteItem } from "@/router/types";
import GlobalMenuJson from '@/language/core/GlobalMenu.json'
import { useConfig } from "@/hooks";
import { findActiveKey } from "@/router/utils";

interface GlobalSiderProp {
  collapse: boolean;
  background: string;
}

interface MenuItem {
  label: string;
  key: string;
  icon?: ReactNode;
  children?: MenuItem[];
  path: string;
}

const _formateMenuItem = ({
  id,
  icon,
  textKey,
  path,
  children,
}: RouteItem): MenuItem => {
  let childrenFormate: MenuItem[] = [];
  if (children?.length)
    childrenFormate = children
      .map((item) => _formateMenuItem(item))
      .filter(({ label }) => !!label);
  return {
    key: id,
    icon,
    label: textKey || "",
    path,
    children: childrenFormate.length ? childrenFormate : undefined,
  };
};

const MenuItems: MenuItem[] = routes
  .filter(({ textKey }) => !!textKey)
  .map((item) => _formateMenuItem(item));

export const GlobalSider: FC<GlobalSiderProp> = ({ collapse, background }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { useLanguage } = useConfig();
  const GlobalMenuText = useLanguage?.(GlobalMenuJson) || {}

  const [activeKey, setActiveKey] = useState(
    MenuItems[0]?.key?.toString() || "dashboard"
  );

  useEffect(() => {
    setActiveKey(findActiveKey(location.pathname) || 'dashboard');
  }, [location.pathname]);

  return (
    <Layout.Sider
      style={{ ...SiderStyle, background }}
      trigger={null}
      collapsible
      collapsed={collapse}
    >
      <Menu
        mode="inline"
        selectedKeys={[activeKey]}
        items={MenuItems.map(item => ({
          ...item,
          label: GlobalMenuText[item.label]
        }))}
        onSelect={({ key }) => {
          setActiveKey(key);
          const result = flatRoutes.find(({ id }) => id === key)?.path;
          navigate(result || "/error");
        }}
      />
    </Layout.Sider>
  );
};
