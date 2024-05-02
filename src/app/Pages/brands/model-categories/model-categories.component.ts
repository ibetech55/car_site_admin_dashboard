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
    private _builder: FormBuilder,
    private _store: Store<IAppState>
  ) {}
  modelCategoriesData$!:Observable<IGetModelCategory[]>;
  errorText!: string;
  categoryData = [
    {
      categoryName: 'Minivan',
      active: 'Active',
      createdAt: '12/12/2023',
      updatedAt: '-',
    },
  ];
  _type = this._builder.control('', Validators.required);
  loading: boolean = false;

  handleSubmit() {
    if (this._type.valid) {
      this.loading = true
      this._store.dispatch(
        modelCategoryActions.createModelCategory({
          values: { type: this._type.getRawValue() as string },
        })
      );
      this.clearForm();
    } else {
      this.errorText = 'Please type a Category Name';
    }
    this.loading = false;
  }

  clearForm() {
    this.errorText = '';
    this._type.reset();
  }

  getModelCategoriesData(){
    this._store.dispatch(modelCategoryActions.getModelCategories())
    this.modelCategoriesData$ = this._store.select(modelCategorySelector.modelCategoriesData)
  }
  ngOnInit(){
    this.getModelCategoriesData()
  }
}
