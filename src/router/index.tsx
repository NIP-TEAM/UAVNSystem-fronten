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
import { NetworkDetail, NetworkStructure } from "@/pages/Network";
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
    textKey: "Login"
  },
  {
    id: "forget",
    element: <Forget />,
    path: "/forget",
    isPublic: true,
    textKey: "Forget"
  },
  {
    id: "register",
    element: <Register />,
    path: "/register",
    isPublic: true,
    textKey: "Register"
  },
  {
    id: "dashboard",
    element: <DashBoard />,
    path: "/dashboard",
    labelKey: "dashboard",
    icon: <PieChartFilled />,
    breadcrumbForbidden: true,
    // textKey: "Dashboard"
  },
  {
    id: "network",
    element: <Navigate to="/network/center" />,
    path: "/network",
    labelKey: "network",
    icon: <GlobalOutlined />,
    children: [
      {
        id: "networkdetail",
        element: <NetworkDetail />,
        path: "/network/:id",
        textKey: "NetworkDetail",
      },
      {
        id: "networkcenter",
        element: <NetworkList />,
        path: "/network/center",
        labelKey: "networkcenter",
        textKey: "Network"
      },
      {
        id: "networkstructure",
        element: <NetworkStructure />,
        path: "/network/structure",
        labelKey: "networkstructure",
        textKey: "NetworkStructure"
      },
    ],
  },
  {
    id: "uavcenter",
    element: <UavList />,
    path: "/uavs",
    labelKey: "uavcenter",
    textKey: "Uav",
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
    labelKey: "emailcenter",
    // textKey: "Email"
  },
  {
    id: "user-center",
    element: <UserCenter />,
    path: "/usercenter",
    labelKey: "usercenter",
    icon: <SettingFilled />,
    // textKey: "Usercenter"
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
