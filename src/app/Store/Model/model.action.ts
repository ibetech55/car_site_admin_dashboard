import { createAction, props } from '@ngrx/store';
import { IGetModelByMakeId, IGetModelPagination } from '../../Data/Brand/Model/GetModel';

export const GET_MODELS_MAKES = '[Makes Details Page] GET_MODELS_MAKES';
export const GET_MODELS_MAKES_SUCCESS =
  '[Makes Details page] GET_MODELS_MAKES_SUCCESS';

  export const GET_MODELS = '[View Models Page] GET_MODELS';
export const GET_MODELS_SUCCESS =
  '[View Models page] GET_MODELS_SUCCESS';

const getModelByMakeId = createAction(
  GET_MODELS_MAKES,
  props<{ makeId: string }>()
);

const getModelByMakeIdSuccess = createAction(
  GET_MODELS_MAKES_SUCCESS,
  props<{ data: IGetModelByMakeId[] }>()
);

const getModels = createAction(
  GET_MODELS
);

const getModelsSuccess = createAction(
  GET_MODELS_SUCCESS,
  props<{ data: IGetModelPagination }>()
);

export const modelActions = {
  getModelByMakeId,
  getModelByMakeIdSuccess,
  getModels,
  getModelsSuccess
};
