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
}
