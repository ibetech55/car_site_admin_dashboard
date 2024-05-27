import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, switchMap } from 'rxjs';
import { MakeService } from '../../services/make.service';
import { ISaveMakes } from '../../Data/Brand/Makes/SaveMakes';
import { IEditMake } from '../../Data/Brand/Makes/EditMake';
import {
  CREATE_MODEL_CATEGORY,
  GET_MODEL_CATEGORIES,
  GET_MODEL_CATEGORY_LIST,
  modelCategoryActions,
} from './model.category.action';
import { ModelCategoryService } from '../../services/model.category/model.category.service';
import { ICreateModelForm } from '../../Data/Brand/Model/CreateModel';

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
          }),
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
              return modelCategoryActions.createModelCategorySuccess({ data});
            }),
            catchError(({error}) =>
              of(modelCategoryActions.createModelCategoryError({ error:error.message }))
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
}
