import { createReducer, on } from '@ngrx/store';
import { IModelCategoryModel } from './model.category.model';
import { ModelCategoryState } from './model.category.state';
import { modelCategoryActions } from './model.category.action';

const initialState: IModelCategoryModel = ModelCategoryState;

export const modelCategoryReducer = createReducer(
  initialState,
  on(modelCategoryActions.getModelCategoryList, (currentState: IModelCategoryModel) => {
    return {
      ...currentState,
      loading: true,
    };
  }),
  on(modelCategoryActions.getModelCategoryListSuccess, (currentState: IModelCategoryModel, action) => {
    return {
      ...currentState,
      modelCategoriesList: action.data,
      loading: false,
    };
  }),
  on(modelCategoryActions.createModelCategory, (currentState: IModelCategoryModel) => {
    return {
      ...currentState,
      loading: true,
    };
  }),
  on(modelCategoryActions.createModelCategorySuccess, (currentState: IModelCategoryModel) => {
    return {
      ...currentState,
      loading: false,
    };
  }),
  on(modelCategoryActions.getModelCategories, (currentState: IModelCategoryModel) => {
    return {
      ...currentState,
      loading: false,
    };
  }),
  on(modelCategoryActions.getModelCategoriesSuccess, (currentState: IModelCategoryModel, action) => {
    return {
      ...currentState,
      loading: true,
      modelCategoriesData: action.data
    };
  }),
);
