import { flatRoutes } from ".";
import { MenuItem, RouteItem } from "./types";

export const findActiveRoute = (target: string): RouteItem | undefined => {
  const result = flatRoutes.find(({ path }) => path === target);
  if (result && result?.textKey) return result;
  return findActiveRoute(target.split("/").slice(0, -1).join("/"));
};

export const findActivePath = (target: string): string => flatRoutes.find(({id}) => id === target)?.path || flatRoutes[0].path

export const _formateMenuItem = ({
  id,
  icon,
  textKey,
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
    label: textKey || "",
    path,
    children: childrenFormate.length ? childrenFormate : undefined,
  };
};

export const findRouteByPath = (targetPath: string): RouteItem => flatRoutes.find(({path}) => path === targetPath) || flatRoutes.find(({path}) => path === '/error')!