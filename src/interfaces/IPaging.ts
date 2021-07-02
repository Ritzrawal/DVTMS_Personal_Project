export interface IPaging {
  count: number;
  next: any;
  previous: any;
}

export interface IPagingResponse<T> {
  count: number;
  next: any;
  previous: any;
  results: T[];
};
