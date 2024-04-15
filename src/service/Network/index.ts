import { useHttp } from "@/hooks";
import { BasicPagination } from "@/types";
import { Key } from "react";

export interface NetworkDataType {
  id: string;
  name: string;
  status: number;
  createAt: string;
  uavsCount: number;
  lastEdit: string;
  creator: {
    name: string;
    id: string;
  };
}

export type DataControllerType = {
  pagination: BasicPagination;
  filter: string;
};

export const useCreateNetwork = (data: Partial<NetworkDataType>) =>
  useHttp({ url: "/network", method: "post", data });

export const useNetworkData = (data: DataControllerType) =>
  useHttp<NetworkDataType[], { pagination: BasicPagination }>({
    url: "/network",
    method: "get",
    data,
  });

export const useDeleteNetworkData = (data: { ids: Key[] }) =>
  useHttp({
    url: "/network",
    method: "delete",
    data,
  });

export const useNetworkDetail = (id: string) => useHttp<NetworkDataType>({
  url: "/network/" + id,
  method: "get"
})
