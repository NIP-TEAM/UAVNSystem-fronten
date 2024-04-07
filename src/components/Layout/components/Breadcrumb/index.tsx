import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb as AntdBreadcrumb, Typography } from "antd";
import { useConfig } from "@/hooks";
import GlobalMenuJson from "@/language/core/GlobalMenu.json";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { findRouteByPath } from "@/router/utils";
import { RouteItem } from "@/router/types";

interface BreadcrumbProp {}

const _formateBreadcurmbItem = ({
  id,
  path,
  textKey,
}: RouteItem): ItemType => ({
  key: id,
  path,
  title: textKey,
});

type GlobalMenuJsonType = typeof GlobalMenuJson

export const MyBreadcrumb: FC<BreadcrumbProp> = () => {
  const GlobalMenuText = useConfig().useLanguage!<"GlobalMenu">("GlobalMenu");
  const [breadcrumbRoutes, setBreadCrumbroutes] = useState<ItemType[]>([
    _formateBreadcurmbItem(findRouteByPath("/dashboard")),
  ]);
  const location = useLocation();
  useEffect(() => {
    if (breadcrumbRoutes.at(-1)?.path === location.pathname) return;
    const newRoute = findRouteByPath(location.pathname);
    setBreadCrumbroutes([
      ...breadcrumbRoutes.filter(({ path }) => path !== location.pathname),
      _formateBreadcurmbItem(newRoute),
    ]);
  }, [location.pathname, breadcrumbRoutes]);
  return (
    <AntdBreadcrumb
      items={breadcrumbRoutes}
      itemRender={(currentRoute) =>
        currentRoute?.path === location.pathname ? (
          <Typography.Text>
            {GlobalMenuText[currentRoute.title as keyof GlobalMenuJsonType]}
          </Typography.Text>
        ) : (
          <Link to={currentRoute.path || "/error"}>
            {GlobalMenuText[currentRoute.title as keyof GlobalMenuJsonType]}
          </Link>
        )
      }
      separator=">"
      style={{ padding: "0.5em 1em" }}
    />
  );
};
