import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CREATE_MODELS, CREATE_MULTIPLE_MODELS, GET_MODELS, GET_MODELS_MAKES, modelActions } from './model.action';
import { ModelService } from '../../services/model/model.service';
import { ICreateModel } from '../../Data/Brand/Model/CreateModel';

@Injectable()
export class ModelEffects {
  constructor(private action$: Actions, private _modelService: ModelService) {}
  _getModelsByMakeId = createEffect(() =>
    this.action$.pipe(
      ofType(GET_MODELS_MAKES),
      switchMap((action:{makeId:string}) => {
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
      switchMap(() => {
        return this._modelService.getModels().pipe(
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
      switchMap((action:{values:ICreateModel[]}) => {
        return this._modelService.saveModels(action.values).pipe(
          map((data) => {
            return modelActions.createModelsSuccess({ data });
          })
        );
      })
    )
  );

  _saveMultipleModels = createEffect(() =>
    this.action$.pipe(
      ofType(CREATE_MULTIPLE_MODELS),
      switchMap((action:{file:File}) => {
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


}



