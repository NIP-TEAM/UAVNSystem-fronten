import { useHttp } from "@/hooks";
import { BasicPagination } from "@/types";

export type UavDataType = {
  id: string;
  name: string;
  uploadSpeed: number;
  downloadSpeed: number;
  status: number;
  createAt: string;
  creatorInfo: {
    name: string;
    id: number;
  };
  networkInfo: {
    name: string;
    id: number;
  };
};

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
    url: "/plane",
    method: "post",
    data,
  });

export const useDeleteUav = (data: { ids: string[] }) =>
  useHttp({
    url: "/plane",
    method: "delete",
    data,
  });
