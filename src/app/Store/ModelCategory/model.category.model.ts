import { IGetModelCategory, IGetModelCategoryList } from '../../Data/Brand/ModelCategory/GetModelCategory';

export interface IModelCategoryModel {
  modelCategoriesData: IGetModelCategory[];
  modelCategoriesList: IGetModelCategoryList[];
  loading: boolean;
}
