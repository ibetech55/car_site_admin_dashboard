import { createAction, props } from '@ngrx/store';
import {
  IGetModelByMakeId,
  IGetModelPagination,
} from '../../Data/Brand/Model/GetModel';
import { ICreateModel, IMultipleModelErrors } from '../../Data/Brand/Model/CreateModel';

export const GET_MODELS_MAKES = '[Makes Details Page] GET_MODELS_MAKES';
export const GET_MODELS_MAKES_SUCCESS =
  '[Makes Details page] GET_MODELS_MAKES_SUCCESS';

export const GET_MODELS = '[View Models Page] GET_MODELS';
export const GET_MODELS_SUCCESS = '[View Models page] GET_MODELS_SUCCESS';

export const CREATE_MODELS = '[Create Models Page] CREATE_MODELS';
export const CREATE_MODELS_SUCCESS =
  '[Create Models page] CREATE_MODELS_SUCCESS';

export const CREATE_MULTIPLE_MODELS =
  '[Create Models Spreadsheet/CSV Page] CREATE_MULTIPLE_MODELS';
export const CREATE_MULTIPLE_MODELS_SUCCESS =
  '[Create Models Spreadsheet/CSV page] CREATE_MULTIPLE_MODELS_SUCCESS';
  export const CREATE_MULTIPLE_MODELS_FAIL =
  '[Create Models Spreadsheet/CSV page] CREATE_MULTIPLE_MODELS_FAIL';

const getModelByMakeId = createAction(
  GET_MODELS_MAKES,
  props<{ makeId: string }>()
);

const getModelByMakeIdSuccess = createAction(
  GET_MODELS_MAKES_SUCCESS,
  props<{ data: IGetModelByMakeId[] }>()
);

const getModels = createAction(GET_MODELS);

const getModelsSuccess = createAction(
  GET_MODELS_SUCCESS,
  props<{ data: IGetModelPagination }>()
);

const createModels = createAction(
  CREATE_MODELS,
  props<{ values: ICreateModel[] }>()
);

const createModelsSuccess = createAction(
  CREATE_MODELS_SUCCESS,
  props<{ data: boolean }>()
);

const createMultipleModels = createAction(
  CREATE_MULTIPLE_MODELS,
  props<{ file: File }>()
);

const createMultipleModelsSuccess = createAction(
  CREATE_MULTIPLE_MODELS_SUCCESS,
  props<{ data: boolean }>()
);

const createMultipleModelsFail = createAction(
  CREATE_MULTIPLE_MODELS_FAIL,
  props<{ errors: IMultipleModelErrors }>()
);

export const modelActions = {
  getModelByMakeId,
  getModelByMakeIdSuccess,
  getModels,
  getModelsSuccess,
  createModelsSuccess,
  createModels,
  createMultipleModels,
  createMultipleModelsSuccess,
  createMultipleModelsFail
};
