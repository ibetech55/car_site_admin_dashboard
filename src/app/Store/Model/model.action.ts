import { createAction, props } from '@ngrx/store';
import {
  IGetModelById,
  IGetModelByMakeId,
  IGetModelPagination,
  IModelFilter,
  IModelOrderBy,
} from '../../Data/Brand/Model/GetModel';
import {
  ICreateModel,
  IMultipleModelErrors,
} from '../../Data/Brand/Model/CreateModel';
import { IEditModel } from '../../Data/Brand/Model/UpdateModel';
import { ICreateModelError } from './model.model';
import { IPagination } from '../../Data/IPagination';
import { IExportBody } from '../../Data/Common';

export const GET_MODELS_MAKES = '[Makes Details Page] GET_MODELS_MAKES';
export const GET_MODELS_MAKES_SUCCESS =
  '[Makes Details page] GET_MODELS_MAKES_SUCCESS';

export const GET_MODELS = '[View Models Page] GET_MODELS';
export const GET_MODELS_SUCCESS = '[View Models page] GET_MODELS_SUCCESS';

export const CREATE_MODELS = '[Create Models Page] CREATE_MODELS';
export const CREATE_MODELS_SUCCESS =
  '[Create Models page] CREATE_MODELS_SUCCESS';
  export const CREATE_MODELS_FAIL =
  '[Create Models page] CREATE_MODELS_FAIL';

export const CREATE_MULTIPLE_MODELS =
  '[Create Models Spreadsheet/CSV Page] CREATE_MULTIPLE_MODELS';
export const CREATE_MULTIPLE_MODELS_SUCCESS =
  '[Create Models Spreadsheet/CSV page] CREATE_MULTIPLE_MODELS_SUCCESS';
export const CREATE_MULTIPLE_MODELS_FAIL =
  '[Create Models Spreadsheet/CSV page] CREATE_MULTIPLE_MODELS_FAIL';

export const VERIFY_MODELS = '[View Models Page] VERIFY_MODELS';
export const VERIFY_MODELS_SUCCESS = '[View Models page] VERIFY_MODELS_SUCCESS';

export const GET_MODEL_BY_ID = '[Model Details Page] GET_MODEL_BY_ID';
export const GET_MODEL_BY_ID_SUCCESS = '[Model Details page] GET_MODEL_BY_ID_SUCCESS';

export const EDIT_MODEL = '[Model Details Page] EDIT_MODEL';
export const EDIT_MODEL_SUCCESS = '[Model Details page] EDIT_MODEL_SUCCESS';
export const EDIT_MODEL_FAIL = '[Model Details page] EDIT_MODEL_FAIL';

export const DELETE_MODEL = '[Model Details Page] DELETE_MODEL';
export const DELETE_MODEL_SUCCESS = '[Model Details page] DELETE_MODEL_SUCCESS';

export const DOWNLOAD_CREATE_MODEL_TEMPLATE = '[Create Models Spreadsheet/CSV page] DOWNLOAD_CREATE_MODEL_TEMPLATE';
export const DOWNLOAD_CREATE_MODEL_TEMPLATE_SUCCESS = '[Create Models Spreadsheet/CSV page] DOWNLOAD_CREATE_MODEL_TEMPLATE_SUCCESS';

export const EXPORT_MODELS_DATA = '[View Models Page] EXPORT_MODELS_DATA';

export const EXPORT_MODELS_DATA_SUCCESS =
  '[View MODELS Page] EXPORT_MODELS_DATA_SUCCESS';


const getModelByMakeId = createAction(
  GET_MODELS_MAKES,
  props<{ makeId: string }>()
);

const getModelByMakeIdSuccess = createAction(
  GET_MODELS_MAKES_SUCCESS,
  props<{ data: IGetModelByMakeId[] }>()
);

const getModels = createAction(GET_MODELS, props<{ filter?: IPagination<IModelFilter, IModelOrderBy> }>());

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

const createModelsFail = createAction(
  CREATE_MODELS_FAIL,
  props<{ error: ICreateModelError }>()
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
export const verifyModels = createAction(
  VERIFY_MODELS,
  props<{ ids: string[]; requestType: string }>()
);
export const verifyModelsSuccess = createAction(
  VERIFY_MODELS_SUCCESS,
  props<{ data: boolean }>()
);

export const getModelById = createAction(
  GET_MODEL_BY_ID,
  props<{ id: string }>()
);
export const getModelByIdSuccess = createAction(
  GET_MODEL_BY_ID_SUCCESS,
  props<{ data: IGetModelById }>()
);

export const editModel = createAction(
  EDIT_MODEL,
  props<{ id: string, values:IEditModel }>()
);
export const editModelSuccess = createAction(
  EDIT_MODEL_SUCCESS,
  props<{ data: boolean }>()
);
export const editModelFail = createAction(
  EDIT_MODEL_FAIL,
  props<{ error: string }>()
);

export const deleteModel = createAction(
  DELETE_MODEL,
  props<{ id: string }>()
);
export const deleteModelSuccess = createAction(
  DELETE_MODEL,
  props<{ data: boolean }>()
);

export const downloadCreateModelsTemplate = createAction(
  DOWNLOAD_CREATE_MODEL_TEMPLATE,
);

export const downloadCreateModelsTemplateSuccess = createAction(
  DOWNLOAD_CREATE_MODEL_TEMPLATE_SUCCESS,
  props<{ download: Blob }>()
);

export const expertModelsData = createAction(
  EXPORT_MODELS_DATA,
  props<{
    exportType: string;
    columns: IExportBody[];
    filters: IPagination<IModelFilter, IModelOrderBy>;
  }>()
);

export const expertModelsDataSuccess = createAction(
  EXPORT_MODELS_DATA_SUCCESS,
  props<{ download: Blob }>()
);

export const modelActions = {
  getModelByMakeId,
  getModelByMakeIdSuccess,
  getModels,
  getModelsSuccess,
  createModelsSuccess,
  createModels,
  createModelsFail,
  createMultipleModels,
  createMultipleModelsSuccess,
  createMultipleModelsFail,
  verifyModels,
  verifyModelsSuccess,
  getModelById,
  getModelByIdSuccess,
  editModel,
  editModelSuccess,
  editModelFail,
  deleteModel,
  deleteModelSuccess,
  downloadCreateModelsTemplate,
  downloadCreateModelsTemplateSuccess,
  expertModelsData,
  expertModelsDataSuccess
};
