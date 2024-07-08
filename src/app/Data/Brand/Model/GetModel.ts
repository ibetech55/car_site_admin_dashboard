export interface IGetModelByMakeId {
  id: string;
  modelName: string;
  makeId: string;
  active: boolean;
  makes: {
    makeName: string;
  };
}

export interface IGetModel {
  id: string;
  modelName: string;
  makeId: string;
  active: boolean;
  createdAt: string | Date;
  make: { makeName: string };
}

export interface IGetModelPagination {
  data: IGetModel[];
  total: number;
  page: number;
  limit: number;
}

export interface IGetModelById {
  id: string;
  modelName: string;
  makeId: string;
  active: boolean;
  make: {
    makeName: string;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
  yearFounded: number;
  bodyType: string;
}

export interface IModelFilter {
  modelName?:string;
  active?: string;
  makeName?: string;
  startDate?: string;
  endDate?: string;
  bodyType?: string;
}

export interface IModelFilterForm {
  modelName?:string;
  active?: string;
  makeName?: string;
  startDate?: string;
  endDate?: string;
  bodyType: string[];
}

export interface IModelOrderBy {
  modelName?:string;
  makeName?: string;
  createdAt?: string;
  origin?: string;
  active?: string;
  bodyType?: string;
}

export interface IExportModelsData {
  modelName?: string;
  makes?: string;
  status?: string;
  active?: string;
  createdAt?: string;
  yearFounded?: string;
  updatedAt?: string;
  bodyType?: string;
}
