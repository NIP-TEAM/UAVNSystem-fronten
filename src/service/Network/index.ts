import { TextKeys, useHttp } from "@/hooks";
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
  uavs: {name: string, id: number}[]
  protocol: {
    name: string,
    id: number
  }
}

export interface ProtocolDataType {
  id: number;
  name: string;
  type:
    | "LCAD"
    | "DCR"
    | "TBRPF"
    | "OLSR"
    | "DSDV"
    | "DSR"
    | "AODV"
    | "customer";
  networks?: {name: string, id: number}[]
  createAt: string
  updateAt: string
  creator?: {name: string, id: number}
  feature: TextKeys<"ProtocolFeature">[]
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

export const useProtocolDataType = (data: NetworkDataControllerType) =>
  useHttp<ProtocolDataType[], BasicMetaType>({
    url: "/protocal",
    method: "get",
    data,
  });

export const useDeleteProtocal = (data: {id: number}) => useHttp({
  url: "/protocal",
  method: 'delete',
  data,
})
