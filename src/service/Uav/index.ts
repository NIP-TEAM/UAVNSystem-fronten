import { useHttp } from "@/hooks";

export interface UavDataType {
    id: string,
    name: string,
    uploadSpeed: number,
    downloadSpeed: number,
}

export const useUavData = (data: Partial<UavDataType>) =>
  useHttp<UavDataType>({
    url: "/tenants/register",
    method: "post",
    data,
  });