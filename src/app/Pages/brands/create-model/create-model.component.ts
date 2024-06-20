import { Component } from '@angular/core';
import { IAppState } from '../../../Store/app.state';
import { Store } from '@ngrx/store';
import { makeActions } from '../../../Store/Make/make.action';
import { makeSelector } from '../../../Store/Make/make.selector';
import { Observable, map } from 'rxjs';
import { MessageService } from 'primeng/api';

import { IGetMakesList } from '../../../Data/Brand/Makes/GetMakes';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ICreateModel,
  ICreateModelForm,
} from '../../../Data/Brand/Model/CreateModel';
import { modelCategoryActions } from '../../../Store/ModelCategory/model.category.action';
import { modelCategorySelector } from '../../../Store/ModelCategory/model.category.selector';
import { IGetModelCategoryList } from '../../../Data/Brand/ModelCategory/GetModelCategory';
import { modelActions } from '../../../Store/Model/model.action';
import { modelSelector } from '../../../Store/Model/model.selector';
interface ISelect {
  name: string;
  code: string;
}
@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrl: './create-model.component.scss',
})
export class CreateModelComponent {
  constructor(
    private _store: Store<IAppState>,
  ) {}

  makeList$: Observable<ISelect[]> = new Observable<ISelect[]>();
  modelCategories$: Observable<ISelect[]> = new Observable<ISelect[]>();
  loading: boolean = false;

  getMakes() {
    this._store.dispatch(makeActions.getMakesList());
    this.makeList$ = this._store.select(makeSelector.makeList).pipe(
      map((data) => {
        return data.map((x) => ({
          name: x.makeName,
          code: x.id,
        }));
      })
    );
  }

  getModelCategories() {
    this._store.dispatch(modelCategoryActions.getModelCategoryList());
    this.modelCategories$ = this._store
      .select(modelCategorySelector.modelCategoryListData)
      .pipe(
        map((data) =>
          data.map((x) => ({
            name: x.type,
            code: x.id,
          }))
        )
      );
  }
  ngOnInit() {
    this.getMakes();
    this.getModelCategories();
  }
}
