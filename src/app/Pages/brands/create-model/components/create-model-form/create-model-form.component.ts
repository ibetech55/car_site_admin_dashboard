import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../../Store/app.state';
import {
  ICreateModel,
  ICreateModelForm,
} from '../../../../../Data/Brand/Model/CreateModel';
import { modelActions } from '../../../../../Store/Model/model.action';
import { Observable } from 'rxjs';
interface ISelect {
  name: string;
  code: string;
}
@Component({
  selector: 'app-create-model-form',
  templateUrl: './create-model-form.component.html',
  styleUrl: './create-model-form.component.scss',
})
export class CreateModelFormComponent {
  constructor(
    private _store: Store<IAppState>,
    private _builder: FormBuilder
  ) {}
  @Input() loading: boolean = false;
  @Input() makeList$ = new Observable<ISelect[]>();
  @Input() modelCategories$ = new Observable<ISelect[]>();

  formItems!: FormArray;
  formName: string = 'modelForms';
  modelFormGroup = this._builder.group({
    modelForms: this._builder.array<ICreateModelForm[]>([]),
  });

  get modelForms() {
    return this.modelFormGroup.get(this.formName) as FormArray;
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
        yearFounded: x.yearFounded,
      }));
      this._store.dispatch(modelActions.createModels({ values: data }));
      this.clearForms()
    }
    this.loading = false;
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

  ngOnInit() {
    this.AddNewRow();
  }
}
