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
  on(modelActions.getModelByMakeIdSuccess, (currentState: IModelModel, action) => {
    return {
      ...currentState,
      modelsByMakes: action.data,
      loading: false,
    };
  })
);
