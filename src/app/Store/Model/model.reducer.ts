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
      ...initialState,
      loading: true,
    };
  }),
  on(modelActions.createModelsSuccess, (currentState: IModelModel, action) => {
    return {
      ...initialState,
      createModelSuccess: true,
      loading: false,
    };
  }),
  on(modelActions.createModelsFail, (currentState: IModelModel, action) => {
    return {
      ...initialState,
      loading: false,
      createModelError: action.error
    };
  }),
  on(modelActions.createMultipleModels, (currentState: IModelModel) => {
    return {
      ...initialState,
      loading: true,
    };
  }),
  on(
    modelActions.createMultipleModelsSuccess,
    (currentState: IModelModel, action) => {
      return {
        ...initialState,
        loading: false,
        createMultipleModelsResponse: true,
      };
    }
  ),
  on(
    modelActions.createMultipleModelsFail,
    (currentState: IModelModel, action) => {
      return {
        ...initialState,
        loading: false,
        errorsMultipleModels: action.errors,
        createMultipleModelsResponse: false,
      };
    }
  ),
  on(modelActions.verifyModels, (currentState: IModelModel) => {
    return {
      ...currentState,
      loading: true,
      verifyModelsResponse: false,
    };
  }),
  on(modelActions.verifyModelsSuccess, (currentState: IModelModel, action) => {
    return {
      ...currentState,
      loading: false,
      verifyModelsResponse: true,
    };
  }),
  on(modelActions.getModelById, (currentState: IModelModel) => {
    return {
      ...currentState,
      loading: true,
      modelData: {
        id: '',
        modelName: '',
        makeId: '',
        active: false,
        createdAt: '',
        updatedAt: '',
        yearFounded: 0,
        make: {
          makeName: '',
        },
      },
    };
  }),
  on(modelActions.getModelByIdSuccess, (currentState: IModelModel, action) => {
    return {
      ...currentState,
      loading: false,
      modelData: action.data,
    };
  }),
  on(modelActions.editModel, (currentState: IModelModel) => {
    return {
      ...currentState,
      loading: true,
      editModelResponse: false,
    };
  }),
  on(modelActions.editModelSuccess, (currentState: IModelModel, action) => {
    return {
      ...currentState,
      loading: false,
      editModelResponse: action.data,
    };
  }),
  on(modelActions.editModelFail, (currentState: IModelModel, action) => {
    return {
      ...currentState,
      loading: false,
      editModelResponse: false,
      editModelError: action.error,
    };
  }),
  on(modelActions.deleteModel, (currentState: IModelModel) => {
    return {
      ...currentState,
      loading: true,
      deleteModelSuccess: false
    };
  }),
  on(modelActions.deleteModelSuccess, (currentState: IModelModel, action) => {
    return {
      ...currentState,
      loading: false,
      deleteModelSuccess: action.data,
    };
  }),
  on(modelActions.downloadCreateModelsTemplate, (currentState: IModelModel, action) => {
    return {
      ...initialState,
      loading: true,
    };
  }),
  on(modelActions.downloadCreateModelsTemplateSuccess, (currentState: IModelModel, action) => {
    return {
      ...initialState,
      downloadCreateModelsTemplate: action.download,
      loading: false,
    };
  }),
  on(
    modelActions.expertModelsData,
    (currentState: IModelModel, action) => {
      return {
        ...initialState,
        modelsData:currentState.modelsData,
        loading: true
      };
    }
  ),
  on(
    modelActions.expertModelsDataSuccess,
    (currentState: IModelModel, action) => {
      return {
        ...currentState,
        exportModelDataDownload: action.download,
        loading: false
      };
    }
  )
);
