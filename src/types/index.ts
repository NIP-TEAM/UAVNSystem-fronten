export type BasicPagination = typeof defaultPagination;

export const defaultPagination = {
  current: 1,
  pageSize: 10,
  total: 10,
};

export interface BasicMetaType {
  pagination: BasicPagination
}

export interface BasicFilterType  {
  searchKey: string;
  filters: Record<string, Record<string, string | number>>;
  sorter: Record<string, 'asc' | 'desc'>;
}