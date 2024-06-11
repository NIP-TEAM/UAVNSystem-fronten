import { useHttp } from "@/hooks";
import { BasicMetaType } from "@/types";
import { NetworkDataControllerType } from "../Network";

export interface ProtocolDataType {
  id: number;
  name: string;
  isDefault: boolean;
  networks?: { name: string; id: number }[];
  createAt: string;
  updateAt: string;
  creator?: { name: string; id: number };
}

export const useGetProtocols = (data: NetworkDataControllerType) =>
  useHttp<ProtocolDataType[], BasicMetaType>({
    url: "/protocol",
    method: "get",
    data,
  });

export const useDeleteProtocal = (data: { id: number }) =>
  useHttp({
    url: "/protocol",
    method: "delete",
    data,
  });
