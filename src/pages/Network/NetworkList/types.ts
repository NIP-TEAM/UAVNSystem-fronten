export type FilterType = {
  searchKey?: string;
  filter?: Record<string, Record<string, string | number>>;
  sorter?: Record<string, 'asc' | 'desc'>;
};
