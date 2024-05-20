export type FilterType = {
  searchKey: string;
  filters: Record<string, Record<string, number | string | boolean>>;
  sorter: Record<string, 'asc' | 'desc'>;
};

type FormListProtocol = {
  category: string;
  quantifier: string;
  content: string | number;
}[];

export interface FormItemProtocol {
  searchKey: string;
  filters: FormListProtocol;
}