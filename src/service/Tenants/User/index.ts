import { useHttp } from "@/hooks";

export interface UserDataType {
    name: string,
    id: number
}

export const useGetUsers = () => useHttp<UserDataType[]>({
    url: "/tenants",
    method: 'get',
})