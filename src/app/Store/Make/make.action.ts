import { createAction, props } from '@ngrx/store';
import {
  IGetMake,
  IGetMakePagination,
  IGetMakesList,
} from '../../Data/Brand/Makes/GetMakes';
import { ISaveMakes } from '../../Data/Brand/Makes/SaveMakes';
import { IEditMake } from '../../Data/Brand/Makes/EditMake';

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
export const EDIT_MAKE = '[View Makes Page] EDIT_MAKE';
export const EDIT_MAKE_SUCCESS = '[View Makes Page] EDIT_MAKE_SUCCESS';
export const GET_MAKES_LIST = '[Create Model Page] GET_MAKES_LIST';
export const GET_MAKES_LIST_SUCCESS =
  '[Create Model Page] GET_MAKES_LIST_SUCCESS';
export const DELETE_MAKE = '[View Makes Page] DELETE_MAKE';
export const DELETE_MAKE_SUCCESS = '[View Makes Page] DELETE_MAKE_SUCCESS';
export const VERIFY_MAKES = '[View Makes Page] VERIFY_MAKES';
export const VERIFY_MAKES_SUCCESS = '[View Makes Page] VERIFY_MAKES_SUCCESS';

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

export const editMake = createAction(
  EDIT_MAKE,
  props<{ id: string; values: IEditMake }>()
);
export const editMakeSuccess = createAction(
  EDIT_MAKE_SUCCESS,
  props<{ response: boolean }>()
);

export const getMakesList = createAction(GET_MAKES_LIST);
export const getMakesListSuccess = createAction(
  GET_MAKES_LIST_SUCCESS,
  props<{ data: IGetMakesList[] }>()
);
export const deleteMake = createAction(DELETE_MAKE, props<{ id: string }>());
export const deleteMakeSuccess = createAction(
  DELETE_MAKE_SUCCESS,
  props<{ data: boolean }>()
);
export const verifyMakes = createAction(
  VERIFY_MAKES,
  props<{ ids: string[]; requestType: string }>()
);
export const verifyMakesSuccess = createAction(
  VERIFY_MAKES_SUCCESS,
  props<{ data: boolean }>()
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
  editMake,
  editMakeSuccess,
  getMakesList,
  getMakesListSuccess,
  deleteMake,
  deleteMakeSuccess,
  verifyMakes,
  verifyMakesSuccess,
};
