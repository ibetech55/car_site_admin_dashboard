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

export interface IMakesFilter {
  makeName?: string;
  origin?: string;
  startDate?: string;
  endDate?: string;
}

export interface IMakeFilterForm {
  makeName?: string;
  origin?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface IMakeOrderBy {
  makeName?: string;
  created_at?: string;
  origin?: string;
  active?: string;
}

export interface IExportMakesData {
  makeName?: string;
  origin?: string;
  active?: string;
  createdAt?: string;
  company?: string;
  yearFounded?: string;
  updatedAt?: string;
}


