import { createReducer, on } from '@ngrx/store';
import { IMakeModel } from './make.model';
import { makeActions } from './make.action';
import { MakeState } from './make.state';

const initialState: IMakeModel = MakeState;

export const makeReducer = createReducer(
  initialState,
  on(makeActions.loadMakes, (currentState: IMakeModel) => {
    return {
      ...currentState,
      loading: true,
    };
  }),
  on(makeActions.loadMakessuccess, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      makes: action.makes,
      loading: false,
    };
  }),
  on(makeActions.saveMakes, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      loading: true,
    };
  }),
  on(makeActions.saveMakesSuccess, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      loading: false,
      makesSaved: true,
      saveMakesError: '',
    };
  }),
  on(makeActions.saveMakesFail, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      loading: false,
      saveMakesError: action.errorText,
      makesSaved: false,
    };
  }),
  on(makeActions.removeMakesError, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      loading: false,
      saveMakesError: '',
      makesSaved: false,
    };
  }),
  on(makeActions.getMakeById, (currentState: IMakeModel) => {
    return {
      ...currentState,
      loading: true,
    };
  }),
  on(makeActions.getMakeByIdSuccess, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      loading: false,
      makeData: action.makeData,
    };
  })
);
