import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  CREATE_MODELS,
  CREATE_MULTIPLE_MODELS,
  DELETE_MODEL,
  DOWNLOAD_CREATE_MODEL_TEMPLATE,
  EDIT_MODEL,
  EXPORT_MODELS_DATA,
  GET_MODELS,
  GET_MODELS_MAKES,
  GET_MODEL_BY_ID,
  VERIFY_MODELS,
  modelActions,
} from './model.action';
import { ModelService } from '../../services/model/model.service';
import { ICreateModel } from '../../Data/Brand/Model/CreateModel';
import { IEditModel } from '../../Data/Brand/Model/UpdateModel';
import { IPagination } from '../../Data/IPagination';
import { IModelFilter, IModelOrderBy } from '../../Data/Brand/Model/GetModel';
import { IExportBody } from '../../Data/Common';

@Injectable()
export class ModelEffects {
  constructor(private action$: Actions, private _modelService: ModelService) {}
  _getModelsByMakeId = createEffect(() =>
    this.action$.pipe(
      ofType(GET_MODELS_MAKES),
      switchMap((action: { makeId: string }) => {
        return this._modelService.getModelsByMakeId(action.makeId).pipe(
          map((data) => {
            return modelActions.getModelByMakeIdSuccess({ data });
          })
        );
      })
    )
  );

  _getModels = createEffect(() =>
    this.action$.pipe(
      ofType(GET_MODELS),
      switchMap((action:{filter:IPagination<IModelFilter, IModelOrderBy>}) => {
        return this._modelService.getModels(action.filter).pipe(
          map((data) => {
            return modelActions.getModelsSuccess({ data });
          })
        );
      })
    )
  );

  _saveModels = createEffect(() =>
    this.action$.pipe(
      ofType(CREATE_MODELS),
      switchMap((action: { values: ICreateModel[] }) => {
        return this._modelService.saveModels(action.values).pipe(
          map((data) => {
            return modelActions.createModelsSuccess({ data });
          }),
          catchError(({ error }) =>
            of(modelActions.createModelsFail({ error: error.message }))
          )
        );
      })
    )
  );

  _saveMultipleModels = createEffect(() =>
    this.action$.pipe(
      ofType(CREATE_MULTIPLE_MODELS),
      switchMap((action: { file: File }) => {
        return this._modelService.saveMultipleModels(action.file).pipe(
          map((data) => {
            return modelActions.createMultipleModelsSuccess({ data });
          }),
          catchError(({ error }) =>
            of(modelActions.createMultipleModelsFail({ errors: error.message }))
          )
        );
      })
    )
  );

  _verifyModels = createEffect(() =>
    this.action$.pipe(
      ofType(VERIFY_MODELS),
      switchMap((action: { ids: string[]; requestType: string }) => {
        return this._modelService
          .verifyModels(action.ids, action.requestType)
          .pipe(
            map((data) => {
              return modelActions.verifyModelsSuccess({ data });
            })
          );
      })
    )
  );

  _getModelById = createEffect(() =>
    this.action$.pipe(
      ofType(GET_MODEL_BY_ID),
      switchMap((action: { id: string }) => {
        return this._modelService.getModelById(action.id).pipe(
          map((data) => {
            return modelActions.getModelByIdSuccess({ data });
          })
        );
      })
    )
  );

  _editModel = createEffect(() =>
    this.action$.pipe(
      ofType(EDIT_MODEL),
      switchMap((action: { id: string; values: IEditModel }) => {
        return this._modelService.editModel(action.id, action.values).pipe(
          map((data) => {
            return modelActions.editModelSuccess({ data });
          }),
          catchError(({ error }) =>
            of(modelActions.editModelFail({ error: error.message }))
          )
        );
      })
    )
  );

  _deleteModel = createEffect(() =>
    this.action$.pipe(
      ofType(DELETE_MODEL),
      switchMap((action: { id: string }) => {
        return this._modelService.deleteModel(action.id).pipe(
          map((data) => {
            return modelActions.deleteModelSuccess({ data });
          })
        );
      })
    )
  );
  _downloadCreateModelTemplate = createEffect(() =>
    this.action$.pipe(
      ofType(DOWNLOAD_CREATE_MODEL_TEMPLATE),
      switchMap(() => {
        return this._modelService.downloadCreateModelsTemplate().pipe(
          map((data) => {
            return modelActions.downloadCreateModelsTemplateSuccess({
              download: data,
            });
          })
        );
      })
    )
  );

  _exportModelsData = createEffect(() =>
    this.action$.pipe(
      ofType(EXPORT_MODELS_DATA),
      switchMap((action:{exportType:string; columns:IExportBody[], filters: IPagination<IModelFilter, IModelOrderBy>}) => {
        return this._modelService.exportModelsData(action.exportType, action.columns, action.filters).pipe(
          map((data) => {
            return modelActions.expertModelsDataSuccess({
              download: data,
            });
          })
        );
      })
    )
  );
}
