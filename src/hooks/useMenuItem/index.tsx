import { ROUTES } from "@/router";
import { RouteItem } from "@/router/types";
import { useConfig, TextKeys } from "../useConfig";
import { ReactNode } from "react";

export interface MenuItem {
    label: string;
    key: string;
    icon?: ReactNode;
    children?: MenuItem[];
    path: string;
  }

export const useMenuRoutes = (): MenuItem[] => {
    const GlobalMenuText = useConfig().useLanguage!<"GlobalMenu">("GlobalMenu")
  
    const _formateMenuItem = ({
      id,
      icon,
      labelKey,
      path,
      children,
    }: RouteItem): MenuItem => {
      let childrenFormate: MenuItem[] = [];
      if (children?.length)
        childrenFormate = children
          .map((item) => _formateMenuItem(item))
          .filter(({ label }) => !!label);
      return {
        key: id,
        icon,
        label: GlobalMenuText[labelKey as TextKeys<"GlobalMenu">],
        path,
        children: childrenFormate.length ? childrenFormate : undefined,
      };
    }
  
    return ROUTES.filter(({ labelKey }) => !!labelKey).map((item) =>
      _formateMenuItem(item)
    );
  };
  