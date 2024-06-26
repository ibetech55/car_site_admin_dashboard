import { createAction, props } from '@ngrx/store';
import {
  IGetModelCategory,
  IGetModelCategoryList,
} from '../../Data/Brand/ModelCategory/GetModelCategory';
import { ICreateModelForm } from '../../Data/Brand/Model/CreateModel';
import { IModelCategoryForm } from '../../Data/Brand/ModelCategory/CreateModelCategeory';
import { IUpdateModelCategory } from '../../Data/Brand/ModelCategory/UpdateModelCategory';

export const GET_MODEL_CATEGORY_LIST =
  '[Model Categories Page] GET_MODEL_CATEGORY_LIST';
export const GET_MODEL_CATEGORY_LIST_SUCCESS =
  '[Model Categories Page] GET_MODEL_CATEGORY_LIST_SUCCESS';

export const CREATE_MODEL_CATEGORY =
  '[Model Categories category Page] CREATE_MODEL_CATEGORY';
export const CREATE_MODEL_CATEGORY_SUCCESS =
  '[Model Categories Page] CREATE_MODEL_CATEGORY_SUCCESS';

export const CREATE_MODEL_CATEGORY_ERROR =
  '[Model Categories Page] CREATE_MODEL_CATEGORY_ERROR';

export const GET_MODEL_CATEGORIES =
  '[Model Categories Page] GET_MODEL_CATEGORIES';
export const GET_MODEL_CATEGORIES_SUCCESS =
  '[Model Categories Page] GET_MODEL_CATEGORIES_SUCCESS';

export const GET_MODEL_CATEGORY_BY_ID =
  '[Model Category Details] GET_MODEL_CATEGORY_BY_ID';
export const GET_MODEL_CATEGORY_BY_ID_SUCCESS =
  '[Model Category Details] GET_MODEL_CATEGORY_BY_ID_SUCCESS';

export const UPDATE_MODEL_CATEGORY =
  '[Model Category Details] UPDATE_MODEL_CATEGORY';
export const UPDATE_MODEL_CATEGORY_SUCCESS =
  '[Model Category Details] UPDATE_MODEL_CATEGORY_SUCCESS';
export const UPDATE_MODEL_CATEGORY_ERROR =
  '[Model Category Details] UPDATE_MODEL_CATEGORY_ERROR';

export const DELETE_MODEL_CATEGORY =
  '[Model Category Details] DELETE_MODEL_CATEGORY';
export const DELETE_MODEL_CATEGORY_SUCCESS =
  '[Model Category Details] DELETE_MODEL_CATEGORY_SUCCESS';

const getModelCategoryList = createAction(GET_MODEL_CATEGORY_LIST);
const getModelCategoryListSuccess = createAction(
  GET_MODEL_CATEGORY_LIST_SUCCESS,
  props<{ data: IGetModelCategoryList[] }>()
);
const createModelCategory = createAction(
  CREATE_MODEL_CATEGORY,
  props<{ values: IModelCategoryForm }>()
);
const createModelCategorySuccess = createAction(
  CREATE_MODEL_CATEGORY_SUCCESS,
  props<{ data: IGetModelCategory }>()
);

const createModelCategoryError = createAction(
  CREATE_MODEL_CATEGORY_ERROR,
  props<{ error: string }>()
);

const getModelCategories = createAction(GET_MODEL_CATEGORIES);
const getModelCategoriesSuccess = createAction(
  GET_MODEL_CATEGORIES_SUCCESS,
  props<{ data: IGetModelCategory[] }>()
);

const getModelCategoryById = createAction(
  GET_MODEL_CATEGORY_BY_ID,
  props<{ id: string }>()
);
const getModelCategoryByIdSuccess = createAction(
  GET_MODEL_CATEGORY_BY_ID_SUCCESS,
  props<{ data: IGetModelCategory }>()
);

const updateModelCategory = createAction(
  UPDATE_MODEL_CATEGORY,
  props<{ id: string; values: IUpdateModelCategory }>()
);
const updateModelCategorySuccess = createAction(
  UPDATE_MODEL_CATEGORY_SUCCESS,
  props<{ data: boolean }>()
);

const updateModelCategoryError = createAction(
  UPDATE_MODEL_CATEGORY_ERROR,
  props<{ error: string }>()
);

const deleteModelCategory = createAction(
  DELETE_MODEL_CATEGORY,
  props<{ id: string }>()
);

const deleteModelCategorySuccess = createAction(
  DELETE_MODEL_CATEGORY_SUCCESS,
  props<{ data: boolean }>()
);

export const modelCategoryActions = {
  getModelCategoryList,
  getModelCategoryListSuccess,
  createModelCategory,
  createModelCategorySuccess,
  getModelCategories,
  getModelCategoriesSuccess,
  createModelCategoryError,
  getModelCategoryById,
  getModelCategoryByIdSuccess,
  updateModelCategory,
  updateModelCategorySuccess,
  updateModelCategoryError,
  deleteModelCategory,
  deleteModelCategorySuccess
};
