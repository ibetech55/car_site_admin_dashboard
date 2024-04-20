import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "./app.state";
import { makeReducer } from "./Make/make.reducer";
import { modelReducer } from "./Model/model.reducer";

export const appReducers: ActionReducerMap<IAppState> = {
  make: makeReducer,
  model: modelReducer
}