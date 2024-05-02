import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IModelCategoryModel } from './model.category.model';
const modelCategoryState = createFeatureSelector<IModelCategoryModel>('modelCategory');
const modelCategoryListData = createSelector(modelCategoryState, (state) => state.modelCategoriesList);
const modelCategoriesData = createSelector(modelCategoryState, (state) => state.modelCategoriesData);


export const modelCategorySelector = {
    modelCategoryListData,
    modelCategoriesData
};
