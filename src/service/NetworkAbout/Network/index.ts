import { useHttp } from "@/hooks";
import { BasicMetaType, BasicPagination } from "@/types";
import { Key } from "react";

export interface NetworkDataType {
  id: number;
  name: string;
  status: number;
  createAt: string;
  uavCount: number;
  lastEdit: string;
  creator: {
    name: string;
    id: string;
  };
  connectMap: string;
  uavs: { name: string; id: number }[];
  protocol: {
    name: string;
    id: number;
  };
}

export type NetworkDataControllerType = {
  pagination: BasicPagination;
  filter: string;
  selectKeys?: string;
};

export const useCreateNetwork = (data: Partial<NetworkDataType>) =>
  useHttp({ url: "/network", method: "post", data });

export const useNetworkData = (data: NetworkDataControllerType) =>
  useHttp<NetworkDataType[], BasicMetaType>({
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

export const useNetworkDetail = (id: string) =>
  useHttp<NetworkDataType>({
    url: "/network/" + id,
    method: "get",
  });
