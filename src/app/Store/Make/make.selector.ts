import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMakeModel } from './make.model';
const makeState = createFeatureSelector<IMakeModel>('make');
const makesData = createSelector(makeState, (state) => state.makes);
const loading = createSelector(makeState, (state) => state.loading);
const makesSaved = createSelector(makeState, (state) => state.makesSaved);
const saveMakesError = createSelector(makeState, (state) => state.saveMakesError);
const makeData = createSelector(makeState, (state) => state.makeData);
const makeList = createSelector(makeState, (state) => state.makeList);

export const makeSelector = {
  makesData,
  loading,
  makesSaved,
  saveMakesError,
  makeData,
  makeList
};
