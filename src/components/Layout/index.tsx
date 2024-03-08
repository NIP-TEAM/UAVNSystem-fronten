import { FC, ReactNode } from "react";
import { RouteItem } from "../../router";
import { Layout } from "antd";

interface AppLayoutProp {
  routes: RouteItem[];
  pageType?: "noFrame" | "frame";
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProp> = ({ children, pageType }) => {
  return pageType === "frame" ? <div>{children}</div> : <Layout.Content>{children}</Layout.Content>;
};
