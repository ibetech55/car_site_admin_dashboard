import { IMakeModel } from "./Make/make.model";
import { IModelModel } from "./Model/model.model";

export interface IAppState {
  make: IMakeModel,
  model: IModelModel
}