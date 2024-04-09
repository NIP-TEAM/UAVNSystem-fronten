import { useHttp } from "@/hooks";

export const useGetUsers = () => useHttp<{name: string, id: number}[]>({
    url: "/tenants",
    method: 'get',
})