import { FC, ReactNode } from "react";
import { RouteItem } from "../../router";
import { Layout } from "antd";
import { LoginLayoutStyle } from "./style";

interface AppLayoutProp {
  routes: RouteItem[];
  pageType?: "noFrame" | "frame";
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProp> = ({ children, pageType }) => {
  return pageType === "frame" ? <div>111{children}</div> : <Layout.Content style={LoginLayoutStyle}>{children}</Layout.Content>;
};
