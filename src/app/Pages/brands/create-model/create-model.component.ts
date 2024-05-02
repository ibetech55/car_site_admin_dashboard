import { Component } from '@angular/core';
import { IAppState } from '../../../Store/app.state';
import { Store } from '@ngrx/store';
import { makeActions } from '../../../Store/Make/make.action';
import { makeSelector } from '../../../Store/Make/make.selector';
import { Observable } from 'rxjs';
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
interface Make {
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
    private _builder: FormBuilder
  ) {}

  makes: Make[] | undefined = [];
  modelCategories: Make[] | undefined = [];
  loading: boolean = false;
  formItems!: FormArray;
  formName: string = 'modelForms';
  modelFormGroup = this._builder.group({
    modelForms: this._builder.array<ICreateModelForm[]>([]),
  });

  AddNewRow() {
    this.formItems = this.modelFormGroup.get(this.formName) as FormArray;
    this.formItems.push(this.GenerateRow());
  }

  GenerateRow(): FormGroup {
    return this._builder.group({
      modelName: this._builder.control('', Validators.required),
      makeId: this._builder.control('', Validators.required),
      modelCategoryId: this._builder.control('', Validators.required),
      yearFounded: this._builder.control(''),
    });
  }

  get modelForms() {
    return this.modelFormGroup.get(this.formName) as FormArray;
  }

  Removeitem(index: number) {
    if (this.formItems.length > 1) {
      this.formItems = this.modelFormGroup.get(this.formName) as FormArray;
      this.formItems.removeAt(index);
    }
  }

  clearForms() {
    this.modelFormGroup.get(this.formName)?.reset();
    this.formItems.clear();
    this.AddNewRow();
  }

  handleSubmit() {
    this.loading = true;

    const modelFormGroup = this.modelFormGroup.get(this.formName) as FormArray;
    const modelFormData = modelFormGroup.getRawValue();
    if (modelFormGroup.valid) {
      const data: ICreateModel[] = modelFormData.map((x: ICreateModelForm) => ({
        modelName: x.modelName,
        makeId: x.makeId,
        modelCategoryId: x.modelCategoryId,
        yearFounded: x.yearFounded
      }));
      this._store.dispatch(modelActions.createModels({ values: data }));
      this.loading = false
    }
  }

  getMakes() {
    this._store.dispatch(makeActions.getMakesList());
    this._store.select(makeSelector.makeList).subscribe((data) => {
      this.makes = data.map((x: IGetMakesList) => {
        return { name: x.makeName, code: x.id };
      });
    });
  }

  getModelCategories() {
    this._store.dispatch(modelCategoryActions.getModelCategoryList());
    this._store
      .select(modelCategorySelector.modelCategoryListData)
      .subscribe((data) => {
        this.modelCategories = data.map((x: IGetModelCategoryList) => {
          return { name: x.type, code: x.id };
        });
      });
  }
  ngOnInit() {
    this.getMakes();
    this.getModelCategories();
    this.AddNewRow();
  }
}
