import { TextKeys, useHttp } from "@/hooks";
import { BasicPagination } from "@/types";
import { Key } from "react";

export interface NetworkDataType {
  id: number;
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

export interface NetworkStructureProtocal {
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
  network?: {name: string, id: number}
  createAt: string
  updateAt: string
  creator?: {name: string, id: number}
  feature: TextKeys<"StructureFeature">[]
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

export const useNetworkDetail = (id: string) =>
  useHttp<NetworkDataType>({
    url: "/network/" + id,
    method: "get",
  });

export const useNetworkStructure = (data: DataControllerType) =>
  useHttp<NetworkStructureProtocal>({
    url: "/network/structure",
    method: "get",
    data,
  });
