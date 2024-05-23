import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../Store/app.state';
import { modelCategoryActions } from '../../../Store/ModelCategory/model.category.action';
import { modelCategorySelector } from '../../../Store/ModelCategory/model.category.selector';
import { Observable } from 'rxjs';
import { IGetModelCategory } from '../../../Data/Brand/ModelCategory/GetModelCategory';

@Component({
  selector: 'app-model-categories',
  templateUrl: './model-categories.component.html',
  styleUrl: './model-categories.component.scss',
})
export class ModelCategoriesComponent {
  constructor(
    private _store: Store<IAppState>
  ) {}
  modelCategoriesData$!: Observable<IGetModelCategory[]>;
  loading:boolean = false
  
  onLoading(value:boolean){
    this.loading = value;
  }

  getModelCategoriesData() {
    this._store.dispatch(modelCategoryActions.getModelCategories());
    this.modelCategoriesData$ = this._store.select(
      modelCategorySelector.modelCategoriesData
    );
  }
  ngOnInit() {
    this.getModelCategoriesData();
  }
}
