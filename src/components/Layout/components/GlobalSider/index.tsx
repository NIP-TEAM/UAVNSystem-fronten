import { Layout, Menu } from "antd";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { SiderStyle } from "./style";
import { routes } from "../../../../router";
import { useLocation, useNavigate } from "react-router";
import { RouteItem } from "../../../../router/types";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";

interface GlobalSiderProp {
  collapse: boolean;
  background: string;
}

interface MenuItem {
  label: string;
  key: string;
  icon?: ReactNode;
  children?: MenuItem[];
  onClick: ({ keyPath }: { keyPath: string[] }) => void;
}

export const GlobalSider: FC<GlobalSiderProp> = ({ collapse, background }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
    }: RouteItem): MenuItem => {
      let childrenFormate: MenuItem[] = [];
      if (children?.length)
        childrenFormate = children
          .map((item) => formateMenuItem(item))
          .filter(({ label }) => !!label);
      return {
        key: id,
        icon,
        label: text || "",
        children: childrenFormate.length ? childrenFormate : undefined,
        onClick: ({ keyPath }) => {
          const selectPath = "/" + keyPath.reverse().join("/");
          if (path === selectPath.toLowerCase()) handleLinkTo(selectPath);
        },
      };
    };
    return routes
      .filter(({ text }) => !!text)
      .map((item) => formateMenuItem(item));
  }, [navigate]);

  // const [activeKey, setActiveKey] = useState('dashBoard')

  const activeKey = useMemo(() => {
    const pathName = location.pathname;
    // console.log(pathName)
    console.log('111')
    const findKey = (target: RouteItem[]): RouteItem | undefined => {
      for (const item of target) {
        // console.log(item.path, pathName)
        if (item?.path === pathName) return item;
        findKey(item.children || []);
      }
    };
    console.log(findKey(routes))
    return findKey(routes)?.id || "dashboard";
  }, [location.pathname]);

  console.log(activeKey, location.pathname);

  return (
    <Layout.Sider
      style={{ ...SiderStyle, background }}
      trigger={null}
      collapsible
      collapsed={collapse}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[MenuItems[0]?.key?.toString() || "dashboard"]}
        // selectedKeys={[activeKey]}
        items={MenuItems}
        onSelect={(e) => console.log(e)}
      />
    </Layout.Sider>
  );
};
