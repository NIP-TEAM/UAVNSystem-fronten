import { Layout, Menu } from "antd";
import { FC, ReactNode, useEffect, useState } from "react";
import { SiderStyle } from "./style";
import { flatRoutes, routes } from "../../../../router";
import { useLocation, useNavigate } from "react-router";
import { RouteItem } from "../../../../router/types";

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
  // onClick: ({ keyPath }: { keyPath: string[] }) => void;
}

const _formateMenuItem = ({
  id,
  icon,
  text,
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
    label: text || "",
    path,
    children: childrenFormate.length ? childrenFormate : undefined,
  };
};

const MenuItems: MenuItem[] = routes
  .filter(({ text }) => !!text)
  .map((item) => _formateMenuItem(item));

export const GlobalSider: FC<GlobalSiderProp> = ({ collapse, background }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeKey, setActiveKey] = useState(
    MenuItems[0]?.key?.toString() || "dashboard"
  );

  useEffect(() => {
    const result = flatRoutes.find(({path}) => path === location.pathname)?.id;
    setActiveKey(result || 'dashboard');
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
