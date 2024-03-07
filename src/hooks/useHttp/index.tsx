import {
  useState,
} from 'react'
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import {
  useConfig,
} from '../useConfig'

export interface UseHttpProps {
  url: string
  method?: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  headers?: AxiosRequestConfig['headers']
  isLocal?: boolean
}

export interface UseHttpState<T> {
  loading: boolean
  error: string | null
  data: T | null
  code: number | null
  fetchData?: () => void
}

export const useHttp = <T, >({
  url,
  method = 'get',
  data,
  headers,
  isLocal = true,
}: UseHttpProps): UseHttpState<T> => {
  const {
    token,
    apiBaseUrl,
    httpStrategy,
  } = useConfig()
  const [state, setState] = useState<UseHttpState<T>>({
    loading: false,
    error: null,
    data: null,
    code: null,
  })

  const fetchData = async () => {
    try {
      setState({
        ...state,
        data: null,
        error: null,
        loading: true,
        code: 0,
      })
      const response: AxiosResponse<T> = await axios({
        url: isLocal ? `${apiBaseUrl}${url}` : url,
        method,
        ...(method === 'get' ? {
          params: data,
        } : {
          data,
        }),
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : '',
        },
      })
      setState({
        loading: false,
        error: null,
        code: 200,
        data: response.data,
      })
    } catch (error) {
      const networkError = error as {response: {data: {meta: {message: string}}, status: number}, message: string}
      setState({
        loading: false,
        error: networkError.response?.data.meta.message || networkError.message,
        code: networkError.response.status,
        data: null,
      })
      httpStrategy?.[networkError.response.status]?.()
    }
  }

  return {
    ...state, fetchData,
  }
}
