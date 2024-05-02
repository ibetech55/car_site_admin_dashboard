import { IMakeModel } from './Make/make.model';
import { IModelModel } from './Model/model.model';
import { IModelCategoryModel } from './ModelCategory/model.category.model';

export interface IAppState {
  make: IMakeModel;
  model: IModelModel;
  modelCategory: IModelCategoryModel;
}
