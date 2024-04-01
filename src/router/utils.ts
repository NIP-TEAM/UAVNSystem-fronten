import { flatRoutes } from ".";

export const findActiveKey = (target: string): string | undefined => {
  const result = flatRoutes.find(({ path }) => path === target);
  if (result && result?.textKey) return result.id;
  return findActiveKey(target.split("/").slice(0, -1).join("/"));
};
