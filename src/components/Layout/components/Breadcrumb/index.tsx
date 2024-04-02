import { FC } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb as AntdBreadcrumb, Typography } from "antd";
import { breadcrumbRoutes } from "@/router";
import { useConfig } from "@/hooks";
import GlobalMenuJson from "@/language/core/GlobalMenu.json";

interface BreadcrumbProp {}

export const MyBreadcrumb: FC<BreadcrumbProp> = () => {
  const { useLanguage } = useConfig();
  const GlobalMenuText = useLanguage?.(GlobalMenuJson) || {};
  return (
    <AntdBreadcrumb
      items={breadcrumbRoutes}
      itemRender={(currentRoute, items) =>
        currentRoute?.path === items[items.length - 1]?.path ? (
          <Typography.Text>
            {GlobalMenuText[currentRoute.title as string]}
          </Typography.Text>
        ) : (
          <Link to={currentRoute.path || "/error"}>
            {GlobalMenuText[currentRoute.title as string]}
          </Link>
        )
      }
      separator="=>"
      style={{ padding: "0.5em" }}
    />
  );
};
