export type PaginatedList<TItem> = {
  page: number
  totalElements: number
  totalPages: number
  items: TItem[]
}
