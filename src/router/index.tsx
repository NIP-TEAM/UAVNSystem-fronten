import { Navigate } from "react-router-dom";
import { Login, ErrorPage } from "../pages";
import { ReactNode } from "react";
import { DashBoard } from "../pages/DashBoard";
import { Register } from "../pages/Register";

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
    isPublic: true,
  },
  {
    id: "dashBoard",
    element: <DashBoard />,
    path: "/dashboard",
  },
  {
    id: "register",
    element: <Register />,
    path: "/register",
    isPublic: true
  }
];

export const pageTypes = {
  noFrame: [
    "",
    "login",
    "register",
  ],
};
