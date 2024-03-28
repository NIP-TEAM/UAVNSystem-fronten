import { Navigate } from "react-router-dom";
import { Login, ErrorPage, UserCenter } from "../pages";
import { DashBoard } from "../pages/DashBoard";
import { Register } from "../pages/Register";
import { Forget } from "../pages/Forget";
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
    text: "Dashboard",
    icon: <PieChartFilled />,
  },
  {
    id: "userCenter",
    element: <UserCenter />,
    path: "/usercenter",
    text: "About Me",
    icon: <SettingFilled />,
    children: [
      {
        id: "test",
        element: <>test</>,
        path: "/usercenter/test",
      },
      {
        id: "test2",
        element: <>222</>,
        path: "/usercenter/test2",
      },
    ],
  },
];

export const flatRoutes: RouteItem[] = (() => {
  const result: RouteItem[] = [];
  const flat = (target: RouteItem[]): void => {
    target.forEach((eachTarget) => {
      if (eachTarget.text) result.push(omit(eachTarget, "children"));
      if (eachTarget.children) flat(eachTarget.children);
    });
  };
  flat(routes);
  console.log(result);
  return result;
})();

export const pageTypes = {
  noFrame: ["", "login", "register", "forget"],
};
