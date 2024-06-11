import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb as AntdBreadcrumb, Typography } from "antd";
import { useConfig } from "@/hooks";
import GlobalMenuJson from "@/language/core/GlobalMenu.json";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { findActiveRoute, findRouteByPath } from "@/router/utils";
import { RouteItem } from "@/router/types";

interface BreadcrumbProp {}

const _formateBreadcurmbItem = ({
  id,
  path,
  labelKey,
}: RouteItem): ItemType => ({
  key: id,
  path,
  title: labelKey,
});

type GlobalMenuJsonType = typeof GlobalMenuJson;

export const MyBreadcrumb: FC<BreadcrumbProp> = () => {
  const GlobalMenuText = useConfig().useLanguage!<"GlobalMenu">("GlobalMenu");
  const [breadcrumbRoutes, setBreadCrumbroutes] = useState<ItemType[]>([
    _formateBreadcurmbItem(findRouteByPath("/dashboard")),
  ]);
  const location = useLocation();
  useEffect(() => {
    if (breadcrumbRoutes.at(-1)?.path === location.pathname) return;
    const newRoute = findActiveRoute(location.pathname) || findRouteByPath('/error')
    setBreadCrumbroutes(
      [
        ...breadcrumbRoutes.filter(({ path }) => path !== newRoute.path),
        _formateBreadcurmbItem(newRoute),
      ]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
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
