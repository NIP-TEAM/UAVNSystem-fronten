import { ReactNode } from "react";

export interface RouteItem {
  id: string;
  element: ReactNode;
  path: string;
  text?: string;
  icon?: ReactNode;
  isPublic?: boolean;
  children?: RouteItem[]
}
