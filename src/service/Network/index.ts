import { useHttp } from "@/hooks";

export interface NetworkDataType {
    id: string,
    name: string,
    status: number,
    createAt: string,
    uavCount: number,
    lastEdit: string,
    creator: {
      name: string,
      id: string,
    }
}

export const useNetworkData = (data: Partial<NetworkDataType>) =>
  useHttp<NetworkDataType>({
    url: "/network",
    method: "get",
    data,
  });