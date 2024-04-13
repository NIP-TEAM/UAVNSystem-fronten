import { useHttp } from "@/hooks";
import { BasicPagination } from "@/types";

export type UavDataType = {
  id: string;
  name: string;
  uploadSpeed: number;
  downloadSpeed: number;
  networkId: number;
  status: number
}

export type UavControllerType = {
  pagination: BasicPagination;
  filter: string;
};

export const useUavData = (data: UavControllerType) =>
  useHttp<UavDataType[], { pagination: BasicPagination }>({
    url: "/plane",
    method: "get",
    data,
  });

export const useCreateUav = (data: Partial<UavDataType>[]) => 
  useHttp({
    url: '/plane',
    method: 'post',
    data,
  });
