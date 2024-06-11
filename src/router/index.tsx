import { Navigate } from "react-router-dom";
import {
  Login,
  ErrorPage,
  DashBoard,
  Forget,
  Register,
  Contact,
  NetworkList,
  UavList,
  CreateContact,
  SelfCenter,
  OtherCenter,
  NetworkDetail,
  NetworkProtocol,
  ProtocolEdit,
  EmailCreate,
  EmailList,
  EmailDetail,
  CreateUav
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
    textKey: "Login",
  },
  {
    id: "forget",
    element: <Forget />,
    path: "/forget",
    isPublic: true,
    textKey: "Forget",
  },
  {
    id: "register",
    element: <Register />,
    path: "/register",
    isPublic: true,
    textKey: "Register",
  },
  {
    id: "dashboard",
    element: <DashBoard />,
    path: "/dashboard",
    labelKey: "dashboard",
    icon: <PieChartFilled />,
    breadcrumbForbidden: true,
    textKey: "Dashboard",
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
        textKey: "Network",
      },
      {
        id: "networkProtocol",
        element: <NetworkProtocol />,
        path: "/network/protocol",
        labelKey: "networkprotocol",
        textKey: "NetworkProtocol",
      },
      {
        id: "protocolEdit",
        element: <ProtocolEdit />,
        path: "/network/protocol/edit/:id",
        textKey: "ProtocolEdit",
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
      {
        id: "createUav",
        element: <CreateUav />,
        path: "/uavs/create",
        textKey: "Uav",
      },
    ],
  },
  {
    id: "email",
    path: "/email",
    element: <Navigate to="/email/list" />,
    labelKey: "email",
    textKey: "Email",
    icon: <MailFilled />,
    children: [
      {
        id: "emailList",
        element: <EmailList />,
        path: "/email/list",
        labelKey: "emailList",
        textKey: "Email",
        children: [
          {
            id: "emailCreate",
            element: <EmailCreate />,
            path: "/email/create",
            textKey: "CreateEmail",
          },
        ],
      },
      {
        id: "emailDetail",
        element: <EmailDetail />,
        path: "/email/:id",
        textKey: "Email",
      },
      {
        id: "contact",
        element: <Contact />,
        path: "/email/contact",
        labelKey: "contact",
        textKey: "Contact",
        children: [
          {
            id: "createcontact",
            element: <CreateContact />,
            path: "/email/contact/create",
            textKey: "CreateContact",
          },
        ],
      },
    ],
  },
  {
    id: "user",
    element: <SelfCenter />,
    path: "/user",
    labelKey: "user",
    icon: <SettingFilled />,
    textKey: "User",
    children: [
      {
        id: "createcontact",
        element: <OtherCenter />,
        path: "/user/:id",
        textKey: "User",
      },
    ],
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
