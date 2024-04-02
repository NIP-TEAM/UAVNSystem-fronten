import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb as AntdBreadcrumb, Typography } from "antd";
import { useConfig } from "@/hooks";
import GlobalMenuJson from "@/language/core/GlobalMenu.json";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { findRouteByPath } from "@/router/utils";
import { RouteItem } from "@/router/types";

interface BreadcrumbProp {}

const _formateBreadcurmbItem = ({id, path, textKey}: RouteItem): ItemType => ({
  // key: id,
  path,
  title: textKey
})

export const MyBreadcrumb: FC<BreadcrumbProp> = () => {
  const { useLanguage } = useConfig();
  const GlobalMenuText = useLanguage?.(GlobalMenuJson) || {};
  const [breadcrumbRoutes, setBreadCrumbroutes] = useState<ItemType[]>([_formateBreadcurmbItem(findRouteByPath('/dashboard'))]);
  const location = useLocation();
  useEffect(() => {
    console.log('111')
    if (breadcrumbRoutes.at(-1)?.path === location.pathname) return;
    const newRoute = findRouteByPath(location.pathname);
    setBreadCrumbroutes([...breadcrumbRoutes, _formateBreadcurmbItem(newRoute)]);
  }, [location.pathname, breadcrumbRoutes]);
  return (
    <AntdBreadcrumb
      items={breadcrumbRoutes}
      itemRender={(currentRoute, _, __, paths) => {
        console.log(paths);
        return currentRoute?.path === location.pathname ? (
          <Typography.Text>
            {GlobalMenuText[currentRoute.title as string]}
          </Typography.Text>
        ) : (
          <Link to={currentRoute.path || "/error"}>
            {GlobalMenuText[currentRoute.title as string]}
          </Link>
        );
      }}
      separator="=>"
      style={{ padding: "0.5em 1em" }}
    />
  );
};
