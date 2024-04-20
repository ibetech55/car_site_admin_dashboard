import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { GET_MODELS_MAKES, modelActions } from './model.action';
import { ModelService } from '../../services/model/model.service';

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


}



