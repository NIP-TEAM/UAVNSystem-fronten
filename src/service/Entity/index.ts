import { useHttp } from "@/hooks";

export interface EntityDatatype {
  map: [number, number];
  speed: number;
  status: boolean;
}

export const useGetEntity = (data: { maps: string }) =>
  useHttp<EntityDatatype[]>({
    url: "/entity",
    method: "get",
    data,
  });
