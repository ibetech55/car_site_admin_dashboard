import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../../Store/app.state';
import { ICreateModel } from '../../../../../Data/Brand/Model/CreateModel';
import { modelActions } from '../../../../../Store/Model/model.action';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { modelSelector } from '../../../../../Store/Model/model.selector';
import { ICreateModelError } from '../../../../../Store/Model/model.model';
import { MessageService } from 'primeng/api';
interface ICreateModelForm {
  modelName: string;
  yearFounded: number;
  makeId: string;
  bodyTypeValues: string[];
  bodyType: string;
  errorModelName: string;
  errorMakeId: string;
  errorBodyType: string;
  errorOriginBorder: boolean;
  errorMakeBorder: boolean;
  errorBodyTypeBorder: boolean;
  errorModelNameBorder: boolean;
}
interface ISelect {
  name: string;
  code: string;
}
@Component({
  selector: 'app-create-model-form',
  templateUrl: './create-model-form.component.html',
  styleUrl: './create-model-form.component.scss',
  providers: [MessageService],
})
export class CreateModelFormComponent {
  constructor(
    private _store: Store<IAppState>,
    private _builder: FormBuilder,
    private _element: ElementRef<HTMLDivElement>,
    private _renderer: Renderer2,
    private _messageService: MessageService
  ) {}
  @Input() loading: boolean = false;
  @Input() makeList$ = new Observable<ISelect[]>();
  @Input() modelCategories$ = new Observable<ISelect[]>();
  error$ = new BehaviorSubject<string>('');
  modelsSavedSub = new Subscription();
  errorSub = new Subscription();

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

    const values = this.modelFormGroup.get(this.formName)?.value;
    const modelFormGroup = this.modelFormGroup.get(this.formName) as FormArray;

    values.map((x: ICreateModelForm, i: number) => {
      const formValues: ICreateModelForm[] = modelFormGroup.value;

      if (!x.modelName) {
        formValues[i].errorModelName = 'Please, give a model name';
        formValues[i].errorModelNameBorder = true;
      }

      if (!x.makeId) {
        formValues[i].errorMakeId = 'Please, select a make';
        formValues[i].errorMakeBorder = true;
        const elem = this._element.nativeElement.querySelector(
          `#selectmake${i}`
        );
        this._renderer.setStyle(elem, 'borderColor', 'red');
      }

      if (!x.bodyTypeValues || !x.bodyTypeValues.length) {
        formValues[i].errorBodyType = 'Please, select a body type';
        formValues[i].errorBodyTypeBorder = true;
        const elem = this._element.nativeElement.querySelector(
          `#modelcategory${i}`
        );
        this._renderer.setStyle(elem, 'borderColor', 'red');
      }
      modelFormGroup?.setValue(formValues);
    });

    if (modelFormGroup.valid) {
      const data: ICreateModel[] = values.map((x: ICreateModelForm) => ({
        modelName: x.modelName,
        makeId: x.makeId,
        bodyType: x.bodyTypeValues,
        yearFounded: x.yearFounded,
      }));
      this._store.dispatch(modelActions.createModels({ values: data }));

      this.modelsSavedSub = this._store
        .select(modelSelector.createModelSuccess)
        .subscribe((data) => {
          if (data) {
            this.clearForms();
            this._messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Data saved successfully',
            });
            this.loading = false;
            this.modelsSavedSub.unsubscribe();
          }
        });

      this.errorSub = this._store
        .select(modelSelector.createModelError)
        .subscribe((data: ICreateModelError) => {
          if (data.text && data.models.length > 0) {
            this.error$.next(data.text);

            values.map((x: ICreateModelForm, i: number) => {
              const formValues: ICreateModelForm[] = modelFormGroup.value;
              formValues[i].errorModelName = '';
              formValues[i].errorMakeId = '';
              formValues[i].errorBodyType = '';

              formValues[i].errorModelNameBorder = false;
              formValues[i].errorMakeBorder = false;
              formValues[i].errorBodyTypeBorder = false;

              if (data.models.includes(x.modelName)) {
                formValues[i].errorModelNameBorder = true;
              }
            });
            this.errorSub.unsubscribe();
          }
        });
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
    this.error$.next('');
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
      bodyTypeValues: this._builder.control([], Validators.required),
      bodyType: this._builder.control('', Validators.required),
      yearFounded: this._builder.control(''),
      errorModelName: this._builder.control(''),
      errorMakeId: this._builder.control(''),
      errorModelCategory: this._builder.control(''),
      errorMakeBorder: this._builder.control(false),
      errorModelCategoryBorder: this._builder.control(false),
      errorModelNameBorder: this._builder.control(false),
    });
  }

  handleBodyType(val: any, index: number) {
    if (val.value.trim()) {
      const bodyTypeArr = [];
      const modelFormGroup = this.modelFormGroup.get(
        this.formName
      ) as FormArray;
      const formValues = modelFormGroup.value;
      bodyTypeArr.push(val.value);
      formValues[index].bodyTypeValues = [
        ...formValues[index].bodyTypeValues,
        ...bodyTypeArr,
      ];
      modelFormGroup?.setValue(formValues);
    }
  }

  handleRemoveBodyType(formIndex: number, bodyTypeIndex: number) {
    const modelFormGroup = this.modelFormGroup.get(this.formName) as FormArray;
    const formValues = modelFormGroup.value;
    formValues[formIndex].bodyTypeValues.splice(bodyTypeIndex, 1);
    modelFormGroup?.setValue(formValues);
  }

  ngOnInit() {
    this.AddNewRow();
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
    this.modelsSavedSub.unsubscribe();
  }
}
