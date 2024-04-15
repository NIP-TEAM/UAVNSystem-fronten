import { Navigate } from "react-router-dom";
import {
  Login,
  ErrorPage,
  UserCenter,
  DashBoard,
  Forget,
  Register,
  Email,
  NetworkList,
  UavList,
} from "../pages";
import { RouteItem } from "./types";
import {
  ClusterOutlined,
  GlobalOutlined,
  MailFilled,
  PieChartFilled,
  SettingFilled,
} from "@ant-design/icons";
import { omit } from "lodash-es";
import { NetworkDetail, NetworkType } from "@/pages/Network";
import { CreateUav } from "@/pages/Uav";

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
    id: "network",
    element: <Navigate to="/network/center" />,
    path: "/network",
    textKey: "network",
    icon: <GlobalOutlined />,
    children: [
      {
        id: "networkdetail",
        element: <NetworkDetail />,
        path: "/network/:id",
      },
      {
        id: "networkcenter",
        element: <NetworkList />,
        path: "/network/center",
        textKey: "networkcenter",
        icon: <GlobalOutlined />,
      },
      {
        id: "networktype",
        element: <NetworkType />,
        path: "/network/type",
        textKey: "ffdfadf",
      },
    ],
  },
  {
    id: "uavcenter",
    element: <UavList />,
    path: "/uavs",
    textKey: "uavcenter",
    icon: <ClusterOutlined />,
    children: [
      { id: "createUav", element: <CreateUav />, path: "/uavs/create" },
    ],
  },
  {
    id: "email-center",
    element: <Email />,
    path: "/emailcenter",
    icon: <MailFilled />,
    textKey: "emailcenter",
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


export const pageTypes = {
  noFrame: ["", "login", "register", "forget"],
};
