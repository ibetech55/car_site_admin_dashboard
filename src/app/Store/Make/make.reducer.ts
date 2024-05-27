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
  }),
  on(makeActions.editMake, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      loading: true,
      editMakeSuccess: false,
      editMakeError: '',
    };
  }),
  on(makeActions.editMakeSuccess, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      loading: false,
      editMakeSuccess: action.response,
      editMakeError: '',
    };
  }),
  on(makeActions.editMakeError, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      loading: false,
      editMakeError: action.error,
    };
  }),
  on(makeActions.getMakesList, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      loading: true,
    };
  }),
  on(makeActions.getMakesListSuccess, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      loading: false,
      makeList: action.data,
    };
  }),
  on(makeActions.deleteMake, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      loading: true,
      deleteMakeResponse: false,
    };
  }),
  on(makeActions.deleteMakeSuccess, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      loading: false,
      deleteMakeResponse: true,
    };
  }),
  on(makeActions.verifyMakes, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      loading: true,
      verifyMakesResponse: false,
    };
  }),
  on(makeActions.verifyMakesSuccess, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      loading: false,
      verifyMakesResponse: action.data,
    };
  }),
  on(makeActions.createMultipleMakes, (currentState: IMakeModel) => {
    return {
      ...currentState,
      loading: true,
      createMultipleMakesResponse: false,
    };
  }),
  on(makeActions.createMultipleMakesSuccess, (currentState: IMakeModel) => {
    return {
      ...currentState,
      loading: false,
      createMultipleMakesResponse: true,
      createMultipleMakesError: '',
    };
  }),
  on(
    makeActions.createMultipleMakesError,
    (currentState: IMakeModel, action) => {
      return {
        ...currentState,
        loading: false,
        createMultipleMakesResponse: false,
        createMultipleMakesError: action.error,
      };
    }
  ),
  on(makeActions.getMakeLogo, (currentState: IMakeModel) => {
    return {
      ...currentState,
      getMakeLogoSuccess: "",
    };
  }),
  on(makeActions.getMakeLogoSuccess, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      getMakeLogoSuccess: action.data,
    };
  }),
  on(makeActions.changeMakeLogo, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
      getMakeLogoSuccess: "",
      changeMakeLogoSuccess: false,
    };
  }),
  on(makeActions.changeMakeLogoSuccess, (currentState: IMakeModel, action) => {
    return {
      ...currentState,
            getMakeLogoSuccess: "",
      changeMakeLogoSuccess: action.data,
    };
  })
);
