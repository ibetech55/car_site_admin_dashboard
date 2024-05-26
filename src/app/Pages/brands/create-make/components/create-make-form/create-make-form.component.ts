import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Subscription, Observable, map } from 'rxjs';
import { ImagePreview } from '../../../../../../utils/ImagePreview';
import { ISaveMakes } from '../../../../../Data/Brand/Makes/SaveMakes';
import { ISelect } from '../../../../../Data/Common';
import { makeActions } from '../../../../../Store/Make/make.action';
import { makeSelector } from '../../../../../Store/Make/make.selector';
import { IAppState } from '../../../../../Store/app.state';
import { LocationService } from '../../../../../services/location/location.service';
import { CONSTANTS } from '../../../../../Constants';
interface ICreateMakeForm {
  makeName: string;
  origin: string;
  yearFounded: number;
  company: string;
  file: File;
  errorMakeName: string;
  errorMakeNameBorder: boolean;
  errorOrigin: string;
  errorOriginBorder: boolean;
  errorUploadImage: string;
  previewImage: {
    url: string;
    id: string;
  };
}
@Component({
  selector: 'app-create-make-form',
  templateUrl: './create-make-form.component.html',
  styleUrl: './create-make-form.component.scss'
})
export class CreateMakeFormComponent {
  @Input() countriesList$!:Observable<ISelect[]>
  formItems!: FormArray;
  formName: string = 'makeForms';
  error$ = new BehaviorSubject<string>('');
  makesSavedSub = new Subscription();
  errorSub = new Subscription();
  loading: boolean = false;
  errorImageType$ = new BehaviorSubject('');


  constructor(
    private _store: Store<IAppState>,
    private _builder: FormBuilder,
    private _element: ElementRef<HTMLDivElement>,
    private _imagePreview: ImagePreview,
    private _locationService: LocationService,
    private _messageService: MessageService,
    private _renderer: Renderer2
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
      company: this._builder.control(''),
      yearFounded: this._builder.control(''),
      file: this._builder.control(''),
      errorMakeName: this._builder.control(''),
      errorMakeNameBorder: this._builder.control(false),
      errorOrigin: this._builder.control(''),
      errorOriginBorder: this._builder.control(false),
      errorUploadImage: this._builder.control(''),
      previewImage: {
        url: this._builder.control(''),
        id: this._builder.control(''),
      },
    });
  }

  handleSubmit() {
    this.loading = true;

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
        const elem = this._element.nativeElement.querySelector(
          `#originselect${i}`
        );
        this._renderer.setStyle(elem, 'borderColor', 'red');
      }

      makeFormGroup?.setValue(formValues);
    });

    if (makeFormGroup.valid) {
      const requestData: ISaveMakes[] = values.map((x: ICreateMakeForm) => ({
        makeName: x.makeName,
        origin: x.origin,
        makeImage: x.file ? x.file : undefined,
        imageId: x.file ? x.previewImage.id : undefined,
        company: x.company ? x.company : undefined,
        yearFounded: x.yearFounded ? x.yearFounded : undefined,
      }));

      this._store.dispatch(makeActions.saveMakes({ values: requestData }));

      this.makesSavedSub = this._store
        .select(makeSelector.makesSaved)
        .subscribe((x) => {
          if (x) {
            this.clearForms();
            this._messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Data saved successfully',
            });
            this.clearForms();
            this.loading = false;
            this.makesSavedSub.unsubscribe();
          }
        });

      this.errorSub = this._store
        .select(makeSelector.saveMakesError)
        .pipe(map((x) => x.match(/\[(.*?)\]/)))
        .subscribe((y: any) => {
          if (y) {
            this.error$.next(y.input);
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
            this.loading = false;
            this.errorSub.unsubscribe();
          }
        });
    }
   this.loading = false;
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
    if(CONSTANTS.IMAGE_FILE_EXT.includes(file.type)){
      formValues[index].errorUploadImage = ''
      formValues[index].file = file;
      formValues[index].previewImage.url =
        this._imagePreview.generateImageUrl(file);
      formValues[index].previewImage.id = this._imagePreview.generateImageId();
  
    } else {
     formValues[index].errorUploadImage = 'Make Logo must an image'
    }
    makeFormGroup?.setValue(formValues);

  }

  clearForms() {
    this.makeFormGroup.get(this.formName)?.reset();
    this.formItems.clear();
    this.error$.next('');
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

  ngOnDestroy() {
    this.errorSub.unsubscribe();
    this.makesSavedSub.unsubscribe();
  }
}
