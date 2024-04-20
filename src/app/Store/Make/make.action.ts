import { createAction, props } from '@ngrx/store';
import { IGetMake, IGetMakePagination } from '../../Data/Brand/Makes/GetMakes';
import { ISaveMakes } from '../../Data/Brand/Makes/SaveMakes';

export const LOAD_MAKES = '[View Makes Page] load makes';
export const LOAD_BLOG_SUCCESS = '[blog page] load blog success';
export const SAVE_MAKES = '[View Makes Page] save makes';
export const SAVE_MAKES_SUCCESS = '[save_makes page] save makes success';
export const SAVE_MAKES_FAIL = '[svae_makes page] save makes fail';
export const REMOVE_SAVE_MAKES_ERROR =
  '[svae_makes page] REMOVE_SAVE_MAKES_ERROR';
export const GET_MAKE_BY_ID = '[makes_details page] GET_MAKE_BY_ID';
export const GET_MAKE_BY_ID_SUCCESS =
  '[makes_details page] GET_MAKE_BY_ID_SUCCESS';

const loadMakes = createAction(LOAD_MAKES);
const loadMakessuccess = createAction(
  LOAD_BLOG_SUCCESS,
  props<{ makes: IGetMakePagination }>()
);

const saveMakes = createAction(SAVE_MAKES, props<{ values: ISaveMakes[] }>());
const saveMakesSuccess = createAction(
  SAVE_MAKES_SUCCESS,
  props<{ makesSaved: boolean }>()
);
export const saveMakesFail = createAction(
  SAVE_MAKES_FAIL,
  props<{ errorText: string }>()
);
export const removeMakesError = createAction(REMOVE_SAVE_MAKES_ERROR);
export const getMakeById = createAction(
  GET_MAKE_BY_ID,
  props<{ id: string }>()
);
export const getMakeByIdSuccess = createAction(
  GET_MAKE_BY_ID_SUCCESS,
  props<{ makeData: IGetMake }>()
);

export const makeActions = {
  loadMakes,
  loadMakessuccess,
  saveMakesSuccess,
  saveMakes,
  saveMakesFail,
  removeMakesError,
  getMakeById,
  getMakeByIdSuccess,
};
