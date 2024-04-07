import { useHttp } from "@/hooks";
import { BasicPagination } from "@/types";

export interface NetworkDataType {
  id: string;
  name: string;
  status: number;
  createAt: string;
  uavCount: number;
  lastEdit: string;
  creator: {
    name: string;
    id: string;
  };
}

export interface DataControllerType {
  pagination: BasicPagination;
  filter: string;
}

export const useNetworkData = (data: DataControllerType) =>
  useHttp<NetworkDataType[], { pagination: BasicPagination }>({
    url: "/network",
    method: "get",
    data,
  });
