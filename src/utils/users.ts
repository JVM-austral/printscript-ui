import {Pagination} from "./pagination.ts";

export type PaginatedUsers = {
  pagination: Pagination,
  users: User[]
}

export type User = {
  email: string,
  id: string
}
