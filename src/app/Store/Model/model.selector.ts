import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IModelModel } from './model.model';
const modelState = createFeatureSelector<IModelModel>('model');
const modelByMakeData = createSelector(modelState, (state) => state.modelsByMakes);
const modelsData = createSelector(modelState, (state) => state.modelsData);
const errorsMultipleModels = createSelector(modelState, (state) => state.errorsMultipleModels);

export const modelSelector = {
  modelByMakeData,
  modelsData,
  errorsMultipleModels
};
