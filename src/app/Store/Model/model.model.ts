import { IGetModel, IGetModelByMakeId, IGetModelPagination } from '../../Data/Brand/Model/GetModel';

export interface IModelModel {
  modelsByMakes: IGetModelByMakeId[];
  loading: boolean;
  modelsData:IGetModelPagination;
}
