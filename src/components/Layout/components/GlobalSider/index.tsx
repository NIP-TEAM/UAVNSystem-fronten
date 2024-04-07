import { Layout, Menu } from "antd";
import { FC, useEffect, useState } from "react";
import { SiderStyle } from "./style";
import { flatRoutes, menuRoutes } from "@/router";
import { useLocation, useNavigate } from "react-router";
import GlobalMenuJson from '@/language/core/GlobalMenu.json'
import { useConfig } from "@/hooks";
import { findActiveKey } from "@/router/utils";
import { MenuItem } from "@/router/types";

interface GlobalSiderProp {
  collapse: boolean;
  background: string;
}

const MenuItems: MenuItem[] = menuRoutes;

export const GlobalSider: FC<GlobalSiderProp> = ({ collapse, background }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const GlobalMenuText = useConfig().useLanguage!("GlobalMenu")

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
          label: GlobalMenuText[item.label as keyof typeof GlobalMenuJson]
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
