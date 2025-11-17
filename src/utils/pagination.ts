export type Pagination = {
  page: number,
  page_size: number,
  count: number
}

export type PaginationParams = {
  page: number,
  page_size: number,
  filter?: string
}
