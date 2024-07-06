import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMakeModel } from './make.model';
const makeState = createFeatureSelector<IMakeModel>('make');
const makesData = createSelector(makeState, (state) => state.makes);
const loading = createSelector(makeState, (state) => state.loading);
const makesSaved = createSelector(makeState, (state) => state.makesSaved);
const saveMakesError = createSelector(makeState, (state) => state.saveMakesError);
const makeData = createSelector(makeState, (state) => state.makeData);
const makeList = createSelector(makeState, (state) => state.makeList);
const deleteMakeResponse = createSelector(makeState, (state) => state.deleteMakeResponse);
const verifyMakesResponse = createSelector(makeState, (state) => state.verifyMakesResponse);
const createMultipleMakesResponse = createSelector(makeState, (state) => state.createMultipleMakesResponse);
const createMultipleMakesError = createSelector(makeState, (state) => state.createMultipleMakesError);
const editMakeError = createSelector(makeState, (state) => state.editMakeError);
const editMakeSuccess = createSelector(makeState, (state) => state.editMakeSuccess);
const getMakeLogoUrl = createSelector(makeState, (state) => state.getMakeLogoSuccess);
const changeMakeLogoSuccess = createSelector(makeState, (state) => state.changeMakeLogoSuccess);
const downloadCreateMakesTemplate = createSelector(makeState, (state) => state.downloadCreateMakesTemplate);
const exportMakeDataDownload = createSelector(makeState, (state) => state.exportMakeDataDownload);

export const makeSelector = {
  makesData,
  loading,
  makesSaved,
  saveMakesError,
  makeData,
  makeList,
  deleteMakeResponse,
  verifyMakesResponse,
  createMultipleMakesResponse,
  createMultipleMakesError,
  editMakeError,
  editMakeSuccess,
  getMakeLogoUrl,
  changeMakeLogoSuccess,
  downloadCreateMakesTemplate,
  exportMakeDataDownload
};
