import { useHttp } from "@/hooks";
import { UserInfo } from "@/store";

export const useGetUsers = () => useHttp<UserInfo[]>({
    url: "/tenants",
    method: 'get',
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