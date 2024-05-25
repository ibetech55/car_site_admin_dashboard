import { IMultipleModelErrors } from '../../Data/Brand/Model/CreateModel';
import {
  IGetModelById,
  IGetModelByMakeId,
  IGetModelPagination,
} from '../../Data/Brand/Model/GetModel';

export interface ICreateModelError {
  text:string;
  models:string[];
}

export interface IModelModel {
  modelsByMakes: IGetModelByMakeId[];
  loading: boolean;
  modelsData: IGetModelPagination;
  errorsMultipleModels: IMultipleModelErrors | undefined;
  createMultipleModelsResponse: boolean;
  verifyModelsResponse: boolean;
  modelData: IGetModelById;
  editModelResponse: boolean;
  editModelError: string;
  createModelError: ICreateModelError;
  createModelSuccess: string;
}
