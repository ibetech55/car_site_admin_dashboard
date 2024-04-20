import { IGetModelByMakeId } from '../../Data/Brand/Model/GetModel';

export interface IModelModel {
  modelsByMakes: IGetModelByMakeId[];
  loading: boolean;
}
