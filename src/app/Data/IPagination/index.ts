export interface IPagination<T, P> {
  where?: T;
  page?: number;
  limit?: number;
  orderBy?: P;
}

export interface IPaginationData {
    page?:number;
    limit?: number;
}

export interface IOrderData {
  order?: string;
  orderBy?:string;
}

export interface ISortField {
  field: string; 
  order: string
}
