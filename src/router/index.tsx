import { Navigate } from "react-router-dom";
import { Login, ErrorPage } from "../pages";
import { ReactNode } from "react";

export interface RouteItem {
  id: string;
  element: ReactNode;
  path: string;
  text?: string;
  icon?: ReactNode;
  isPublic?: boolean;
}

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
  },
  {
    id: "login",
    element: <Login />,
    path: "/login",
  },
];

export const pageTypes = {
  noFrame: [
    "",
    "login",
    "registration",
    "conditions-view",
    "forms",
    "congratulations",
    "sample",
  ],
};
