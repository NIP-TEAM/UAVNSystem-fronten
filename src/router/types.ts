import { ReactNode } from "react";

export interface RouteItem {
  id: string;
  element?: ReactNode;
  path: string;
  textKey?: string;
  icon?: ReactNode;
  isPublic?: boolean;
  children?: RouteItem[]
  breadcrumbForbidden?: boolean
}

export interface MenuItem {
  label: string;
  key: string;
  icon?: ReactNode;
  children?: MenuItem[];
  path: string;
}