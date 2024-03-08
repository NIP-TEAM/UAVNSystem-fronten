import { AxiosResponse } from "axios";

interface DefaultMetaType {
  message?: string;
  pagination?: {
    limit: number;
    offset: number;
    totalCount: number;
  };
}

export interface ResponseType<DataType = unknown, MetaType = DefaultMetaType>
  extends AxiosResponse<DataType> {
  data: DataType;
  meta: MetaType;
}
