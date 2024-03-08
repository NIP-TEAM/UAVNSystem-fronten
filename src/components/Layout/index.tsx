import { FC, ReactNode } from "react";
import { RouteItem } from "../../router";

interface AppLayoutProp {
  routes: RouteItem[];
  pageType?: "noFrame" | "frame";
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProp> = ({ children }) => {
  return (
    <div>
      111
      {children}
    </div>
  );
};
