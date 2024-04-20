export interface IGetMake {
  id: string;
  makeName: string;
  origin: string;
  makeLogo: string;
  active: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IGetMakePagination {
    data:IGetMake[],
    total: number,
    page: number,
    limit: number
}