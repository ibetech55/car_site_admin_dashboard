import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IModelCategoryModel } from './model.category.model';
const modelCategoryState =
  createFeatureSelector<IModelCategoryModel>('modelCategory');
const modelCategoryListData = createSelector(
  modelCategoryState,
  (state) => state.modelCategoriesList
);
const modelCategoriesData = createSelector(
  modelCategoryState,
  (state) => state.modelCategoriesData
);
const createModelCategoryError = createSelector(
  modelCategoryState,
  (state) => state.createModelCategoryError
);
const createModelCategorySuccess = createSelector(
  modelCategoryState,
  (state) => state.createModelCategorySuccess
);
const modelCategoryData = createSelector(
  modelCategoryState,
  (state) => state.modelCategoryData
);
const updateMCSuccess = createSelector(
  modelCategoryState,
  (state) => state.updateMCSuccess
);
const updateMCError = createSelector(
  modelCategoryState,
  (state) => state.updateMCError
);
const deleteMCSuccess = createSelector(
  modelCategoryState,
  (state) => state.deleteMCSuccess
);

export const modelCategorySelector = {
  modelCategoryListData,
  modelCategoriesData,
  createModelCategoryError,
  createModelCategorySuccess,
  modelCategoryData,
  updateMCSuccess,
  updateMCError,
  deleteMCSuccess,
};
