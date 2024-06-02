import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, switchMap } from 'rxjs';
import { MakeService } from '../../services/make.service';
import { ISaveMakes } from '../../Data/Brand/Makes/SaveMakes';
import { IEditMake } from '../../Data/Brand/Makes/EditMake';
import {
  CREATE_MODEL_CATEGORY,
  DELETE_MODEL_CATEGORY,
  GET_MODEL_CATEGORIES,
  GET_MODEL_CATEGORY_BY_ID,
  GET_MODEL_CATEGORY_LIST,
  UPDATE_MODEL_CATEGORY,
  modelCategoryActions,
} from './model.category.action';
import { ModelCategoryService } from '../../services/model.category/model.category.service';
import { ICreateModelForm } from '../../Data/Brand/Model/CreateModel';
import { IUpdateModelCategory } from '../../Data/Brand/ModelCategory/UpdateModelCategory';

@Injectable()
export class ModelCategoryEffects {
  constructor(
    private action$: Actions,
    private _modelCategoryService: ModelCategoryService
  ) {}

  _getModelCategoryList = createEffect(() =>
    this.action$.pipe(
      ofType(GET_MODEL_CATEGORY_LIST),
      switchMap(() => {
        return this._modelCategoryService.getModelCategoryList().pipe(
          map((data) => {
            return modelCategoryActions.getModelCategoryListSuccess({ data });
          })
        );
      })
    )
  );

  _createModelCategpry = createEffect(() =>
    this.action$.pipe(
      ofType(CREATE_MODEL_CATEGORY),
      switchMap((action: { values: ICreateModelForm }) => {
        return this._modelCategoryService
          .createModelCategory(action.values)
          .pipe(
            map((data) => {
              return modelCategoryActions.createModelCategorySuccess({ data });
            }),
            catchError(({ error }) =>
              of(
                modelCategoryActions.createModelCategoryError({
                  error: error.message,
                })
              )
            )
          );
      })
    )
  );

  _getModelCategories = createEffect(() =>
    this.action$.pipe(
      ofType(GET_MODEL_CATEGORIES),
      switchMap(() => {
        return this._modelCategoryService.getModelCategories().pipe(
          map((data) => {
            return modelCategoryActions.getModelCategoriesSuccess({ data });
          })
        );
      })
    )
  );

  _getModelCategoryById = createEffect(() =>
    this.action$.pipe(
      ofType(GET_MODEL_CATEGORY_BY_ID),
      switchMap((action: { id: string }) => {
        return this._modelCategoryService.getModelCategoryById(action.id).pipe(
          map((data) => {
            return modelCategoryActions.getModelCategoryByIdSuccess({ data });
          })
        );
      })
    )
  );

  _updateModelCategoryById = createEffect(() =>
    this.action$.pipe(
      ofType(UPDATE_MODEL_CATEGORY),
      switchMap((action: { id: string; values: IUpdateModelCategory }) => {
        return this._modelCategoryService
          .updateModelCategory(action.id, action.values)
          .pipe(
            map((data) => {
              return modelCategoryActions.updateModelCategorySuccess({ data });
            }),
            catchError(({error}) =>
              of(
                modelCategoryActions.updateModelCategoryError({
                  error: error.message,
                })
              )
            )
          );
      })
    )
  );

  _deleteModelCategoryById = createEffect(() =>
    this.action$.pipe(
      ofType(DELETE_MODEL_CATEGORY),
      switchMap((action: { id: string }) => {
        return this._modelCategoryService
          .deleteModelCategory(action.id)
          .pipe(
            map((data) => {
              return modelCategoryActions.deleteModelCategorySuccess({ data });
            })
          );
      })
    )
  );
}
