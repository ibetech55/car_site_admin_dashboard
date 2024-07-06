import { createAction, props } from '@ngrx/store';
import {
  IExportBody,
  IGetMake,
  IGetMakePagination,
  IGetMakesList,
  IMakeOrderBy,
  IMakesFilter,
} from '../../Data/Brand/Makes/GetMakes';
import { ISaveMakes } from '../../Data/Brand/Makes/SaveMakes';
import { IEditMake } from '../../Data/Brand/Makes/EditMake';
import { IPagination } from '../../Data/IPagination';

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
export const EDIT_MAKE_ERROR = '[View Makes Page] EDIT_MAKE_ERROR';

export const GET_MAKES_LIST = '[Create Model Page] GET_MAKES_LIST';
export const GET_MAKES_LIST_SUCCESS =
  '[Create Model Page] GET_MAKES_LIST_SUCCESS';
export const DELETE_MAKE = '[View Makes Page] DELETE_MAKE';
export const DELETE_MAKE_SUCCESS = '[View Makes Page] DELETE_MAKE_SUCCESS';
export const VERIFY_MAKES = '[View Makes Page] VERIFY_MAKES';
export const VERIFY_MAKES_SUCCESS = '[View Makes Page] VERIFY_MAKES_SUCCESS';
export const CREATE_MULTIPLE_MAKES =
  '[Create Multiple Makes Page] CREATE_MULTIPLE_MAKES';
export const CREATE_MULTIPLE_MAKES_SUCCESS =
  '[Create Multiple Makes Page] CREATE_MULTIPLE_MAKES_SUCCESS';
export const CREATE_MULTIPLE_MAKES_ERROR =
  '[Create Multiple Makes Page] CREATE_MULTIPLE_MAKES_ERROR';

export const GET_MAKE_LOGO = '[Make Details Page] GET_MAKE_LOGO';
export const GET_MAKE_LOGO_SUCCESS =
  '[Make Details Page] GET_MAKE_LOGO_SUCCESS';

export const CHANGE_MAKE_LOGO = '[Make Details Page] CHANGE_MAKE_LOGO';
export const CHANGE_MAKE_LOGO_SUCCESS =
  '[Make Details Page] CHANGE_MAKE_LOGO_SUCCESS';

export const DOWNLOAD_CREATE_MAKES_TEMPLATE =
  '[Create Multiple Makes Page] DOWNLOAD_CREATE_MAKES_TEMPLATE';
export const DOWNLOAD_CREATE_MAKES_TEMPLATE_SUCCESS =
  '[Create Multiple Makes Page] DOWNLOAD_CREATE_MAKES_TEMPLATE_SUCCESS';

export const EXPORT_MAKES_DATA = '[View Makes Page] EXPORT_MAKES_DATA';

export const EXPORT_MAKES_DATA_SUCCESS =
  '[View Makes Page] EXPORT_MAKES_DATA_SUCCESS';

const loadMakes = createAction(
  LOAD_MAKES,
  props<{ filter?: IPagination<IMakesFilter, IMakeOrderBy> }>()
);
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
export const editMakeError = createAction(
  EDIT_MAKE_ERROR,
  props<{ error: string }>()
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

export const createMultipleMakes = createAction(
  CREATE_MULTIPLE_MAKES,
  props<{ file: File }>()
);

export const createMultipleMakesSuccess = createAction(
  CREATE_MULTIPLE_MAKES_SUCCESS,
  props<{ data: boolean }>()
);

export const createMultipleMakesError = createAction(
  CREATE_MULTIPLE_MAKES_ERROR,
  props<{ error: string }>()
);

export const getMakeLogo = createAction(GET_MAKE_LOGO, props<{ id: string }>());

export const getMakeLogoSuccess = createAction(
  GET_MAKE_LOGO_SUCCESS,
  props<{ data: string }>()
);

export const changeMakeLogo = createAction(
  CHANGE_MAKE_LOGO,
  props<{ id: string; makeLogo: File }>()
);

export const changeMakeLogoSuccess = createAction(
  CHANGE_MAKE_LOGO_SUCCESS,
  props<{ data: boolean }>()
);

export const downloadCreateMakesTemplate = createAction(
  DOWNLOAD_CREATE_MAKES_TEMPLATE
);

export const downloadCreateMakesTemplateSuccess = createAction(
  DOWNLOAD_CREATE_MAKES_TEMPLATE_SUCCESS,
  props<{ download: Blob }>()
);

export const expertMakesData = createAction(
  EXPORT_MAKES_DATA,
  props<{
    exportType: string;
    columns: IExportBody[];
    filters: IPagination<IMakesFilter, IMakeOrderBy>;
  }>()
);

export const expertMakesDataSuccess = createAction(
  EXPORT_MAKES_DATA_SUCCESS,
  props<{ download: Blob }>()
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
  createMultipleMakes,
  createMultipleMakesSuccess,
  createMultipleMakesError,
  editMakeError,
  getMakeLogo,
  getMakeLogoSuccess,
  changeMakeLogo,
  changeMakeLogoSuccess,
  downloadCreateMakesTemplate,
  downloadCreateMakesTemplateSuccess,
  expertMakesData,
  expertMakesDataSuccess
};
