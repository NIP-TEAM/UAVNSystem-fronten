import { useHttp } from "@/hooks";
import { UserInfo } from "@/store";

export const useGetUsers = (data?: {take: number}) => useHttp<UserInfo[]>({
    url: "/tenants",
    method: 'get',
    data,
})

export const useGetUser = (id : number) => useHttp<UserInfo>({
    url: "/tenants/" + id,
    method: 'get',
})

export const useUpdateUser = (data: Partial<UserInfo>) => useHttp({
    url: "/tenants",
    method: 'patch',
    data,
})