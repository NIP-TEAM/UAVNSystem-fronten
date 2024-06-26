import { useContext, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useConfig } from "../useConfig";
import { AppContext } from "@/App";
import { useNavigate } from "react-router";

export interface UseHttpProps {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  headers?: AxiosRequestConfig["headers"];
  isLocal?: boolean;
}

interface ApiResponseData<DataType, MetaType> {
  status: number;
  data: DataType;
  meta: MetaType;
  [key: string]: unknown;
}

export interface UseHttpState<DataType, MetaType> {
  loading: boolean;
  error: string | null;
  data: ApiResponseData<DataType, MetaType> | null;
  code: number | null;
  fetchData?: () => void;
}

export const useHttp = <DataType = unknown, MetaType = unknown>({
  url,
  method = "get",
  data,
  headers,
  isLocal = true,
}: UseHttpProps): UseHttpState<DataType, MetaType> => {
  const { messageApi } = useContext(AppContext);
  const navigate = useNavigate();
  const { token, apiBaseUrl, language } = useConfig();
  const [state, setState] = useState<UseHttpState<DataType, MetaType>>({
    loading: false,
    error: null,
    data: null,
    code: null,
  });

  const fetchData = async () => {
    try {
      setState({
        ...state,
        data: null,
        error: null,
        loading: true,
        code: 0,
      });
      const response: AxiosResponse<DataType> = await axios({
        url: isLocal ? `${apiBaseUrl}${url}` : url,
        method,
        ...(method === "get"
          ? {
              params: data,
            }
          : {
              data,
            }),
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      setState({
        loading: false,
        error: null,
        code: 200,
        data: response.data as ApiResponseData<DataType, MetaType>,
      });
    } catch (error) {
      const httpStrategy: {[key: number]: () => void} = {
        401: () => {
          navigate('/login')
        }
      }

      const networkError = error as {
        response: {
          data: { meta: { message: string }; message: string };
          status: number;
        };
        message: string;
      };

      let errorMsg = "";
      try {
        errorMsg = JSON.parse(
          networkError?.response?.data?.message ||
            networkError?.response?.data?.meta?.message ||
            networkError?.message
        )[language!];
      } catch {
        errorMsg =
          networkError?.response?.data?.message ||
          networkError?.response?.data?.meta?.message ||
          networkError?.message;
      }
      setState({
        loading: false,
        error: typeof errorMsg === "string" ? errorMsg : errorMsg[language!],
        code: networkError.response?.status || 0,
        data: null,
      });

      messageApi?.error(errorMsg)
      httpStrategy[networkError?.response?.status || 401]?.();
    }
  };

  return {
    ...state,
    fetchData,
  };
};
