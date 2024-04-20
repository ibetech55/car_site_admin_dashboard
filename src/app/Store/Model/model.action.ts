import { createAction, props } from '@ngrx/store';
import { IGetModelByMakeId } from '../../Data/Brand/Model/GetModel';

export const GET_MODELS_MAKES = '[Makes Details Page] GET_MODELS_MAKES';
export const GET_MODELS_MAKES_SUCCESS =
  '[Makes Details page] GET_MODELS_MAKES_SUCCESS';

const getModelByMakeId = createAction(
  GET_MODELS_MAKES,
  props<{ makeId: string }>()
);

const getModelByMakeIdSuccess = createAction(
  GET_MODELS_MAKES_SUCCESS,
  props<{ data: IGetModelByMakeId[] }>()
);

export const modelActions = {
  getModelByMakeId,
  getModelByMakeIdSuccess,
};
