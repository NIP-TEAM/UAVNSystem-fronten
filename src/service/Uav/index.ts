import { useHttp } from "@/hooks";
import { BasicPagination } from "@/types";

export type UavDataType = {
  id: string;
  name: string;
  uploadSpeed: number;
  downloadSpeed: number;
  netWorkId: number;
}

export type UavControllerType = {
  pagination: BasicPagination;
  filter: string;
};

export const useUavData = (data: UavControllerType) =>
  useHttp<UavDataType[], { pagination: BasicPagination }>({
    url: "/uav",
    method: "get",
    data,
  });
