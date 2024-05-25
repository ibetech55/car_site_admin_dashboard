import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IModelModel } from './model.model';

const modelState = createFeatureSelector<IModelModel>('model');
const modelByMakeData = createSelector(modelState, (state) => state.modelsByMakes);
const modelsData = createSelector(modelState, (state) => state.modelsData);
const errorsMultipleModels = createSelector(modelState, (state) => state.errorsMultipleModels);
const createMultipleModelsResponse = createSelector(modelState, (state) => state.createMultipleModelsResponse);
const verifyModelsResponse = createSelector(modelState, (state) => state.verifyModelsResponse);
const modelData = createSelector(modelState, (state) => state.modelData);
const editModelResponse = createSelector(modelState, (state) => state.editModelResponse);
const editModelError = createSelector(modelState, (state) => state.editModelError);
const createModelError = createSelector(modelState, (state) => state.createModelError);
const createModelSuccess = createSelector(modelState, (state) => state.createModelSuccess);

export const modelSelector = {
  modelByMakeData,
  modelsData,
  errorsMultipleModels,
  createMultipleModelsResponse,
  verifyModelsResponse,
  modelData,
  editModelResponse,
  editModelError,
  createModelError,
  createModelSuccess
};
