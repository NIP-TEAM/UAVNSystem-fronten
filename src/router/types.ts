import { LanguageJsonSet } from "@/language";
import { ReactNode } from "react";

export interface RouteItem {
  id: string;
  element?: ReactNode;
  path: string;
  labelKey?: string;
  textKey?: LanguageJsonSet;
  icon?: ReactNode;
  isPublic?: boolean;
  children?: RouteItem[]
  breadcrumbForbidden?: boolean
}