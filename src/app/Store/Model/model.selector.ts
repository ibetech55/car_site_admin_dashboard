import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IModelModel } from './model.model';
const maState = createFeatureSelector<IModelModel>('model');
const modelByMakeData = createSelector(maState, (state) => state.modelsByMakes);

export const modelSelector = {
  modelByMakeData,
};
