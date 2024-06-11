export type FilterType = {
  searchKey: string;
  filters: Record<string, Record<string, string | number | boolean>>;
  sorter: Record<string, 'asc' | 'desc'>;
};
