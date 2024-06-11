import { flatRoutes } from ".";
import { RouteItem } from "./types";

export const findActiveRoute = (target: string): RouteItem | undefined => {
  const result = flatRoutes.find(({ path }) => path === target);
  if (result && result?.labelKey) return result;
  return findActiveRoute(target.split("/").slice(0, -1).join("/"));
};

export const findActivePath = (target: string): string => flatRoutes.find(({id}) => id === target)?.path || flatRoutes[0].path

export const findRouteByPath = (targetPath: string): RouteItem => flatRoutes.find(({path}) => path === targetPath) || flatRoutes.find(({path}) => path === '/error')!