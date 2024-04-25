import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IModelModel } from './model.model';
const modelState = createFeatureSelector<IModelModel>('model');
const modelByMakeData = createSelector(modelState, (state) => state.modelsByMakes);
const modelsData = createSelector(modelState, (state) => state.modelsData);

export const modelSelector = {
  modelByMakeData,
  modelsData
};
