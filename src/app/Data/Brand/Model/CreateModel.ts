export interface ICreateModelForm {
  modelName: string;
  makeId: string;
  modelCategoryId: string;
  yearFounded: number;
}

export interface ICreateModel {
  modelName: string;
  makeId: string;
  modelCategoryId: string;
  yearFounded: number;
}

export interface IMultipleModelErrors {
  makeError?: string;
  modelError?: string;
  modelCategoryError?: string;
  columnError?:string;
}
