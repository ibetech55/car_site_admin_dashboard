import { IModelModel } from "./model.model";

export const ModelState: IModelModel = {
    modelsByMakes: [],
    loading: false,
    modelsData: {
        data: [],
        total: 0,
        page: 0,
        limit: 0
    },
    errorsMultipleModels: undefined
};
