import { Dispatch, FC, SetStateAction } from "react";

import { Table } from "antd";
import { UavDataType } from "@/service/Uav";
import { FilterType } from "@/pages/Network/NetworkList/types";
import { BasicPagination } from "@/types";

export interface DataListProp {
  uavLoading: boolean;
  uavListData: UavDataType[];
  storageFunc: () => void;
  setTimestamp: Dispatch<SetStateAction<number>>;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  initSorter?: Record<string, "asc" | "desc">;
  pagination: BasicPagination;
  setPagination: Dispatch<SetStateAction<BasicPagination>>;
}

export const DataList: FC<DataListProp> = ({ uavLoading, uavListData }) => {
  return <Table loading={uavLoading} dataSource={uavListData} />;
};
