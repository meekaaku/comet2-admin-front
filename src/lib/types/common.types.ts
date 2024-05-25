export interface RPaginated<T> {
  page: number;
  page_size: number;
  page_count: number;
  item_count: number;
  items: T[];
}
