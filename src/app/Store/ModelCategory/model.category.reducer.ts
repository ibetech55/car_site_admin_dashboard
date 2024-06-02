import { createReducer, on } from '@ngrx/store';
import { IModelCategoryModel } from './model.category.model';
import { ModelCategoryState } from './model.category.state';
import { modelCategoryActions } from './model.category.action';

const initialState: IModelCategoryModel = ModelCategoryState;

export const modelCategoryReducer = createReducer(
  initialState,
  on(
    modelCategoryActions.getModelCategoryList,
    (currentState: IModelCategoryModel) => {
      return {
        ...currentState,
        loading: true,
      };
    }
  ),
  on(
    modelCategoryActions.getModelCategoryListSuccess,
    (currentState: IModelCategoryModel, action) => {
      return {
        ...currentState,
        modelCategoriesList: action.data,
        loading: false,
      };
    }
  ),
  on(
    modelCategoryActions.createModelCategory,
    (currentState: IModelCategoryModel) => {
      return {
        ...initialState,
        loading: true,
      };
    }
  ),
  on(
    modelCategoryActions.createModelCategorySuccess,
    (currentState: IModelCategoryModel) => {
      return {
        ...currentState,
        createModelCategorySuccess: true,
        loading: false,
      };
    }
  ),
  on(
    modelCategoryActions.createModelCategoryError,
    (currentState: IModelCategoryModel, action) => {
      return {
        ...initialState,
        loading: false,
        createModelCategoryError: action.error,
      };
    }
  ),
  on(
    modelCategoryActions.getModelCategories,
    (currentState: IModelCategoryModel) => {
      return {
        ...initialState,
        loading: false,
      };
    }
  ),
  on(
    modelCategoryActions.getModelCategoriesSuccess,
    (currentState: IModelCategoryModel, action) => {
      return {
        ...initialState,
        loading: true,
        modelCategoriesData: action.data,
      };
    }
  ),
  on(
    modelCategoryActions.getModelCategoryById,
    (currentState: IModelCategoryModel) => {
      return {
        ...initialState,
        loading: false,
      };
    }
  ),
  on(
    modelCategoryActions.getModelCategoryByIdSuccess,
    (currentState: IModelCategoryModel, action) => {
      return {
        ...initialState,
        modelCategoryData: action.data,
      };
    }
  ),
  on(
    modelCategoryActions.updateModelCategory,
    (currentState: IModelCategoryModel, action) => {
      return {
        ...currentState,
      };
    }
  ),
  on(
    modelCategoryActions.updateModelCategorySuccess,
    (currentState: IModelCategoryModel, action) => {
      return {
        ...currentState,
        updateMCSuccess: action.data,
      };
    }
  ),
  on(
    modelCategoryActions.updateModelCategoryError,
    (currentState: IModelCategoryModel, action) => {
      return {
        ...currentState,
        updateMCError: action.error,
      };
    }
  ),
  on(
    modelCategoryActions.deleteModelCategory,
    (currentState: IModelCategoryModel, action) => {
      return {
        ...currentState,
      };
    }
  ),
  on(
    modelCategoryActions.deleteModelCategorySuccess,
    (currentState: IModelCategoryModel, action) => {
      return {
        ...currentState,
        deleteMCSuccess: action.data,
      };
    }
  )
);
