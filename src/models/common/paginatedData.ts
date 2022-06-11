export type PaginatedData<TData> = {
  data: TData[]
  nextCursor?: number
}
