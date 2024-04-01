import { Navigate } from "react-router-dom";
import { Login, ErrorPage, UserCenter, DashBoard, Forget, Register } from "../pages";
import { RouteItem } from "./types";
import { PieChartFilled, SettingFilled } from "@ant-design/icons";
import { omit } from "lodash-es";

export const routes: RouteItem[] = [
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
  flat(routes);
  return result;
})();

export const pageTypes = {
  noFrame: ["", "login", "register", "forget"],
};
