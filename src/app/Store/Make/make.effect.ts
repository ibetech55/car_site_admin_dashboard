import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, switchMap } from 'rxjs';
import { MakeService } from '../../services/make.service';
import {
  GET_MAKE_BY_ID,
  LOAD_MAKES,
  SAVE_MAKES,
  makeActions,
} from './make.action';
import { ISaveMakes } from '../../Data/Brand/Makes/SaveMakes';

@Injectable()
export class MakeEffects {
  constructor(private action$: Actions, private _makeService: MakeService) {}
  _blog = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_MAKES),
      switchMap(() => {
        return this._makeService.getMakes().pipe(
          map((data) => {
            return makeActions.loadMakessuccess({ makes: data });
          })
        );
      })
    )
  );

  _saveMakes = createEffect(() =>
    this.action$.pipe(
      ofType(SAVE_MAKES),
      switchMap((action: { values: ISaveMakes[] }) => {
        return this._makeService.saveMakes(action.values).pipe(
          map((data) => {
            return makeActions.saveMakesSuccess({ makesSaved: data });
          }),
          catchError(({ error }) =>
            of(makeActions.saveMakesFail({ errorText: error.message }))
          )
        );
      })
    )
  );

  _getMakeById = createEffect(() =>
    this.action$.pipe(
      ofType(GET_MAKE_BY_ID),
      switchMap((action: { id: string }) => {
        return this._makeService.getMakeById(action.id).pipe(
          map((data) => {
            return makeActions.getMakeByIdSuccess({ makeData:data });
          }),
          catchError(({ error }) =>
            of(makeActions.saveMakesFail({ errorText: error.message }))
          )
        );
      })
    )
  );
}



