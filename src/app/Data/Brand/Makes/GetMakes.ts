export interface IGetMake {
  id: string;
  makeName: string;
  origin: string;
  makeLogo: string;
  active: boolean;
  yearFounded: number;
  company: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IGetMakePagination {
  data: IGetMake[];
  total: number;
  page: number;
  limit: number;
}

export interface IGetMakesList {
  id: string;
  makeName: string;
}
