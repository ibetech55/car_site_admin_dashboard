import { createReducer, on } from '@ngrx/store';
import { IModelModel } from './model.model';
import { ModelState } from './model.state';
import { modelActions } from './model.action';

const initialState: IModelModel = ModelState;

export const modelReducer = createReducer(
  initialState,
  on(modelActions.getModelByMakeId, (currentState: IModelModel) => {
    return {
      ...currentState,
      loading: true,
    };
  }),
  on(
    modelActions.getModelByMakeIdSuccess,
    (currentState: IModelModel, action) => {
      return {
        ...currentState,
        modelsByMakes: action.data,
        loading: false,
      };
    }
  ),
  on(modelActions.getModels, (currentState: IModelModel, action) => {
    return {
      ...currentState,
      loading: true,
    };
  }),
  on(modelActions.getModelsSuccess, (currentState: IModelModel, action) => {
    return {
      ...currentState,
      modelsData: action.data,
      loading: false,
    };
  }),
  on(modelActions.createModels, (currentState: IModelModel) => {
    return {
      ...currentState,
      loading: true,
    };
  }),
  on(modelActions.createModelsSuccess, (currentState: IModelModel, action) => {
    return {
      ...currentState,
      loading: false,
    };
  }),
  on(modelActions.createMultipleModels, (currentState: IModelModel) => {
    return {
      ...currentState,
      loading: true,
    };
  }),
  on(
    modelActions.createMultipleModelsSuccess,
    (currentState: IModelModel, action) => {
      return {
        ...currentState,
        loading: false,
      };
    }
  ),
  on(
    modelActions.createMultipleModelsFail,
    (currentState: IModelModel, action) => {
      return {
        ...currentState,
        loading: false,
        errorsMultipleModels: action.errors,
      };
    }
  )
);
