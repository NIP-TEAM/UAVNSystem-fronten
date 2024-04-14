export type FilterType = {
    searchKey?: string;
    filters?: Record<string, Record<string, string | number>>;
    sorter?: Record<string, 'asc' | 'desc'>;
  };
  