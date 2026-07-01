/** Standard API error shape from the backend */
export interface ApiError {
  detail: string;
  errorCode: string;
}

/** Generic paginated response wrapper */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
