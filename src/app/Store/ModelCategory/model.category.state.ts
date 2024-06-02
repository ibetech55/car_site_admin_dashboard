import { IModelCategoryModel } from './model.category.model';

export const ModelCategoryState: IModelCategoryModel = {
  modelCategoriesList: [],
  loading: false,
  modelCategoriesData: [],
  createModelCategoryError: "",
  createModelCategorySuccess: false,
  modelCategoryData: {
    id: '',
    type: '',
    active: false,
    createdAt: '',
    updatedAt: ''
  },
  updateMCSuccess: false,
  updateMCError: '',
  deleteMCSuccess: false
};
