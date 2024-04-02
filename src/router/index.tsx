import { Navigate } from "react-router-dom";
import { Login, ErrorPage, UserCenter, DashBoard, Forget, Register } from "../pages";
import { BreadcrumbItem, MenuItem, RouteItem } from "./types";
import { PieChartFilled, SettingFilled } from "@ant-design/icons";
import { omit } from "lodash-es";
import { _formateBreadcrumbItem, _formateMenuItem } from "./utils";

export const ROUTES: readonly RouteItem[] = [
  {
    id: "not-found",
    path: "*",
    element: <Navigate to="/login" />,
  },
  {
    id: "error",
    path: "/error",
    element: <ErrorPage />,
    isPublic: true,
  },
  {
    id: "login",
    element: <Login />,
    path: "/login",
    isPublic: true,
  },
  {
    id: "forget",
    element: <Forget />,
    path: "/forget",
    isPublic: true,
  },
  {
    id: "register",
    element: <Register />,
    path: "/register",
    isPublic: true,
  },
  {
    id: "dashboard",
    element: <DashBoard />,
    path: "/dashboard",
    textKey: "dashboard",
    icon: <PieChartFilled />,
    breadcrumbForbidden: true,
  },
  {
    id: "user-center",
    element: <UserCenter />,
    path: "/usercenter",
    textKey: "usercenter",
    icon: <SettingFilled />,
  },
];

export const flatRoutes: RouteItem[] = (() => {
  const result: RouteItem[] = [];
  const flat = (target: RouteItem[]): void => {
    target.forEach((eachTarget) => {
      result.push(omit(eachTarget, "children"));
      if (eachTarget.children) flat(eachTarget.children);
    });
  };
  flat([...ROUTES]);
  return result;
})();

export const menuRoutes: MenuItem[] = ROUTES
  .filter(({ textKey }) => !!textKey)
  .map((item) => _formateMenuItem(item))

export const breadcrumbRoutes: BreadcrumbItem[] = ROUTES
  .filter(({ textKey }) => !!textKey)
  .map((item) => _formateBreadcrumbItem(item))

export const pageTypes = {
  noFrame: ["", "login", "register", "forget"],
};
