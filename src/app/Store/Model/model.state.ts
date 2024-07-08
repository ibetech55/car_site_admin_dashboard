import { IModelModel } from './model.model';

export const ModelState: IModelModel = {
  modelsByMakes: [],
  loading: false,
  modelsData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  errorsMultipleModels: undefined,
  createMultipleModelsResponse: false,
  verifyModelsResponse: false,
  modelData: {
    id: '',
    modelName: '',
    makeId: '',
    active: false,
    make: {
      makeName: ''
    },
    createdAt: '',
    updatedAt: '',
    yearFounded: 0,
    bodyType: ''
  },
  editModelResponse: false,
  editModelError: '',
  createModelError: {
    text: '',
    models: []
  },
  createModelSuccess: false,
  deleteModelSuccess: false,
  downloadCreateModelsTemplate: undefined,
  exportModelDataDownload: undefined
};
