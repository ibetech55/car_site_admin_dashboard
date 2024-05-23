import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGetModelCategory } from '../../../../../Data/Brand/ModelCategory/GetModelCategory';
import { modelCategoryActions } from '../../../../../Store/ModelCategory/model.category.action';
import { modelCategorySelector } from '../../../../../Store/ModelCategory/model.category.selector';
import { IAppState } from '../../../../../Store/app.state';

@Component({
  selector: 'app-create-model-categories-form',
  templateUrl: './create-model-categories-form.component.html',
  styleUrl: './create-model-categories-form.component.scss',
})
export class CreateModelCategoriesFormComponent {
  constructor(
    private _builder: FormBuilder,
    private _store: Store<IAppState>
  ) {}
  @Output() onLoading = new EventEmitter<boolean>(false);
  @Input() getModelCategoriesData!:() => void;
  errorText!: string;
  _type = this._builder.control('', Validators.required);
  handleSubmit() {
    this.onLoading.emit(true);
    if (this._type.valid) {
      this._store.dispatch(
        modelCategoryActions.createModelCategory({
          values: { type: this._type.getRawValue() as string },
        })
      );
      this.clearForm();
      this.getModelCategoriesData();
    } else {
      this.errorText = 'Please type a Category Name';
    }
    this.onLoading.emit(false);
  }

  clearForm() {
    this.errorText = '';
    this._type.reset();
  }
}
