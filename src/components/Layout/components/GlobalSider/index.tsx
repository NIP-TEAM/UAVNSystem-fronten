import { Layout, Menu } from "antd";
import { FC, useEffect, useState } from "react";
import { SiderStyle } from "./style";
import { flatRoutes } from "@/router";
import { useLocation, useNavigate } from "react-router";
import { useMenuRoutes } from "@/hooks";
import { findActiveRoute } from "@/router/utils";

interface GlobalSiderProp {
  collapse: boolean;
  background: string;
}

export const GlobalSider: FC<GlobalSiderProp> = ({ collapse, background }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const MenuItems = useMenuRoutes();

  const [activeKey, setActiveKey] = useState(
    MenuItems[0]?.key?.toString() || "dashboard"
  );

  useEffect(() => {
    setActiveKey(findActiveRoute(location.pathname)?.id || 'dashboard');
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
        items={MenuItems}
        onSelect={({ key }) => {
          setActiveKey(key);
          const result = flatRoutes.find(({ id }) => id === key)?.path;
          navigate(result || "/error");
        }}
      />
    </Layout.Sider>
  );
};
