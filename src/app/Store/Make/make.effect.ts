import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, switchMap, exhaustMap } from 'rxjs';
import { MakeService } from '../../services/make.service';
import {
  CREATE_MULTIPLE_MAKES,
  DELETE_MAKE,
  EDIT_MAKE,
  GET_MAKES_LIST,
  GET_MAKE_BY_ID,
  LOAD_MAKES,
  SAVE_MAKES,
  VERIFY_MAKES,
  makeActions,
} from './make.action';
import { ISaveMakes } from '../../Data/Brand/Makes/SaveMakes';
import { IEditMake } from '../../Data/Brand/Makes/EditMake';
import { CREATE_MODELS_SUCCESS } from '../Model/model.action';

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

  _editMake = createEffect(() =>
    this.action$.pipe(
      ofType(EDIT_MAKE),
      switchMap((action: { id: string, values:IEditMake }) => {
        return this._makeService.editMake(action.id, action.values).pipe(
          map((data) => {
            return makeActions.editMakeSuccess({ response:data });
          }),
          catchError(({ error }) =>
            of(makeActions.saveMakesFail({ errorText: error.message }))
          )
        );
      })
    )
  );

  _getMakesList = createEffect(() =>
    this.action$.pipe(
      ofType(GET_MAKES_LIST),
      switchMap(() => {
        return this._makeService.getMakesList().pipe(
          map((data) => {
            return makeActions.getMakesListSuccess({ data });
          }),
          catchError(({ error }) =>
            of(makeActions.saveMakesFail({ errorText: error.message }))
          )
        );
      })
    )
  );

  _deleteMake = createEffect(() =>
    this.action$.pipe(
      ofType(DELETE_MAKE),
      switchMap((action:{id:string}) => {
        return this._makeService.deleteMake(action.id).pipe(
          map((data) => {
            return makeActions.deleteMakeSuccess({ data });
          })
        );
      })
    )
  );

  _verifyMakes = createEffect(() =>
    this.action$.pipe(
      ofType(VERIFY_MAKES),
      switchMap((action:{ids:string[], requestType:string}) => {
        return this._makeService.verifyMakes(action.ids, action.requestType).pipe(
          map((data) => {
            return makeActions.verifyMakesSuccess({ data });
          })
        );
      })
    )
  );

  _multipleMakes = createEffect(() =>
    this.action$.pipe(
      ofType(CREATE_MULTIPLE_MAKES),
      switchMap((action:{file:File}) => {
        return this._makeService.createMultipleMakes(action.file).pipe(
          map((data) => {
            return makeActions.createMultipleMakesSuccess({ data });
          }),
          catchError(({ error }) =>
            of(makeActions.createMultipleMakesError({ error: error.message }))
          )
        );
      })
    )
  );
}



