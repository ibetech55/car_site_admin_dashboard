import { Component, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePreview } from '../../../../../utils/ImagePreview';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../Store/app.state';
import { makeActions } from '../../../../Store/Make/make.action';
import { ISaveMakes } from '../../../../Data/Brand/Makes/SaveMakes';
import { makeSelector } from '../../../../Store/Make/make.selector';
import { Observable, delay, first, forkJoin, last, map, take, tap } from 'rxjs';

interface ICreateMakeForm {
  makeName: string;
  origin: string;
  file: File;
  errorMakeName: string;
  errorMakeNameBorder: boolean;
  errorOrigin: string;
  errorOriginBorder: boolean;
  previewImage: {
    url: string;
    id: string;
  };
}
@Component({
  selector: 'app-create-make',
  templateUrl: './create-make.component.html',
  styleUrl: './create-make.component.scss',
})
export class CreateMakeComponent {
  formItems!: FormArray;
  formName: string = 'makeForms';
  error$!: Observable<string>;
  makesSaved$!: Observable<boolean>;
  loading: boolean = false;

  constructor(
    private _store: Store<IAppState>,
    private _builder: FormBuilder,
    private _element: ElementRef<HTMLDivElement>,
    private _imagePreview: ImagePreview
  ) {}
  makeFormGroup = this._builder.group({
    makeForms: this._builder.array<ICreateMakeForm[]>([]),
  });

  AddNewRow() {
    this.formItems = this.makeFormGroup.get(this.formName) as FormArray;
    this.formItems.push(this.GenerateRow());
  }

  get makeForms() {
    return this.makeFormGroup.get(this.formName) as FormArray;
  }
  GenerateRow(): FormGroup {
    return this._builder.group({
      makeName: this._builder.control('', Validators.required),
      origin: this._builder.control('', Validators.required),
      file: this._builder.control(''),
      errorMakeName: this._builder.control(''),
      errorMakeNameBorder: this._builder.control(false),
      errorOrigin: this._builder.control(''),
      errorOriginBorder: this._builder.control(false),
      previewImage: {
        url: this._builder.control(''),
        id: this._builder.control(''),
      },
    });
  }

  handleSubmit() {
    const values = this.makeFormGroup.get(this.formName)?.value;
    const makeFormGroup = this.makeFormGroup.get(this.formName) as FormArray;

    values.map((x: ICreateMakeForm, i: number) => {
      const formValues: ICreateMakeForm[] = makeFormGroup.value;

      if (!x.makeName) {
        formValues[i].errorMakeName = 'Please, give a Make Name';
        formValues[i].errorMakeNameBorder = true;
      }

      if (!x.origin) {
        formValues[i].errorOrigin = 'Please, give an Origin';
        formValues[i].errorOriginBorder = true;
      }

      makeFormGroup?.setValue(formValues);
    });

    if (makeFormGroup.valid) {
      this.loading = true;

      const requestData: ISaveMakes[] = values.map((x: ICreateMakeForm) => ({
        makeName: x.makeName,
        origin: x.origin,
        makeImage: x.file ? x.file : undefined,
        imageId: x.file ? x.previewImage.id : undefined,
      }));

      this._store.dispatch(makeActions.saveMakes({ values: requestData }));

      this.makesSaved$ = this._store.select(makeSelector.makesSaved);
      this.makesSaved$.pipe(delay(1000)).subscribe((x) => {
        if (x) {
          this.clearForms();
        } else {
          this.error$ = this._store.select(makeSelector.saveMakesError);

          this.error$
            .pipe(map((x) => x.match(/\[(.*?)\]/)))
            .subscribe((y: any) => {
              const arr = JSON.parse(y[0]);
              values.map((x: ICreateMakeForm, i: number) => {
                const formValues: ICreateMakeForm[] = makeFormGroup.value;
                formValues[i].errorMakeName = '';
                formValues[i].errorOrigin = '';
                formValues[i].errorMakeNameBorder = false;
                formValues[i].errorOriginBorder = false;

                if (arr.includes(x.makeName)) {
                  formValues[i].errorMakeNameBorder = true;
                }
                makeFormGroup?.setValue(formValues);
              });
            });
        }
        this.loading = false;
      });
    }
  }

  Removeitem(index: number) {
    if (this.formItems.length > 1) {
      this.formItems = this.makeFormGroup.get(this.formName) as FormArray;
      this.formItems.removeAt(index);
    }
  }

  onUpload(file: File, index: number) {
    const makeFormGroup = this.makeFormGroup.get(this.formName) as FormArray;

    const formValues = makeFormGroup.value;
    formValues[index].file = file;
    formValues[index].previewImage.url =
      this._imagePreview.generateImageUrl(file);
    formValues[index].previewImage.id = this._imagePreview.generateImageId();

    makeFormGroup?.setValue(formValues);
  }

  clearForms() {
    this.makeFormGroup.get(this.formName)?.reset();
    this.formItems.clear();
    this._store.dispatch(makeActions.removeMakesError());
    this.AddNewRow();
  }

  removeLogo(index: number, id: string) {
    const makeFormGroup = this.makeFormGroup.get(this.formName) as FormArray;
    const previewImageUrl = this._element.nativeElement
      .querySelector(id)
      ?.getAttribute('src') as string;
    this._imagePreview.removeImageUrl(previewImageUrl);
    const formValues = makeFormGroup.value;
    formValues[index].file = '';
    formValues[index].previewImage.url = '';
    formValues[index].previewImage.id = '';

    makeFormGroup?.setValue(formValues);
  }

  ngOnInit(): void {
    this.AddNewRow();
  }
}
