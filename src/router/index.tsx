import { Navigate } from "react-router-dom";
import { Login, ErrorPage } from "../pages";
import { DashBoard } from "../pages/DashBoard";
import { Register } from "../pages/Register";
import { Forget } from "../pages/Forget";
import { RouteItem } from "./types";

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
    isPublic: true
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
    id: "dashBoard",
    element: <DashBoard />,
    path: "/dashboard",
  },
];

export const pageTypes = {
  noFrame: ["", "login", "register", "forget"],
};
