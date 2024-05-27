import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IModelCategoryModel } from './model.category.model';
const modelCategoryState = createFeatureSelector<IModelCategoryModel>('modelCategory');
const modelCategoryListData = createSelector(modelCategoryState, (state) => state.modelCategoriesList);
const modelCategoriesData = createSelector(modelCategoryState, (state) => state.modelCategoriesData);
const createModelCategoryError = createSelector(modelCategoryState, (state) => state.createModelCategoryError);
const createModelCategorySuccess = createSelector(modelCategoryState, (state) => state.createModelCategorySuccess);


export const modelCategorySelector = {
    modelCategoryListData,
    modelCategoriesData,
    createModelCategoryError,
    createModelCategorySuccess
};
