import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../../Store/app.state';
import { makeSelector } from '../../../../../Store/Make/make.selector';
import { FormBuilder, Validators } from '@angular/forms';
import { IEditMake } from '../../../../../Data/Brand/Makes/EditMake';
import { makeActions } from '../../../../../Store/Make/make.action';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { LocationService } from '../../../../../services/location/location.service';
import { ISelect } from '../../../../../Data/Common';
import { ImagePreview } from '../../../../../../utils/ImagePreview';
import { MessageService } from 'primeng/api';

interface IEditForm {
  makeName: string;
  origin: string;
  company: string;
  yearFounded: string;
  active: boolean;
  errorMakeName: string;
  errorMakeNameBorder: boolean;
  errorOrigin: string;
  errorOriginBorder: boolean;
}

@Component({
  selector: 'app-edit-make-dialog',
  templateUrl: './edit-make-dialog.component.html',
  styleUrl: './edit-make-dialog.component.scss',
  providers: [MessageService],
})
export class EditMakeDialogComponent {
  constructor(
    private _store: Store<IAppState>,
    private _builder: FormBuilder,
    private _locationService: LocationService,
    private _element: ElementRef<HTMLDivElement>,
    private _imagePreview: ImagePreview,
    private _renderer: Renderer2,
    private _messageService: MessageService
  ) {}
  @Input() handleLoading!: () => void;
  @Input() getMake!: () => void;
  @Input() showDialog: boolean = false;
  @Input() loading: boolean = false;
  @Output() editDialog = new EventEmitter<boolean>();
  @Output() closeEditModal = new EventEmitter<void>();
  @Output() closeEditModalSuccess = new EventEmitter<void>();
  editData!: IEditMake;
  @Input() id!: string;
  countriesList$!: Observable<ISelect[]>;
  bordorColor = '#ced4da';
  formSub = new Subscription();
  editMakeSub = new Subscription();
  errorSub = new Subscription();
  errorText$ = new BehaviorSubject('');

  editMakeFormGroup = this._builder.group({
    makeName: this._builder.control('', Validators.required),
    origin: this._builder.control('', Validators.required),
    company: this._builder.control(''),
    yearFounded: this._builder.control(''),
    active: this._builder.control(false, Validators.required),
    errorMakeName: this._builder.control(''),
    errorMakeNameBorder: this._builder.control(false),
    errorOrigin: this._builder.control(''),
    errorOriginBorder: this._builder.control(false),
  });

  unSubscriptions() {
    this.formSub.unsubscribe();
    this.editMakeSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  originSelectDefault() {
    const elem = this._element.nativeElement.querySelector('#originselectedit');
    if (elem) {
      this._renderer.setStyle(elem, 'borderColor', this.bordorColor);
    }
  }

  closeDialog() {
    this.originSelectDefault();
    this.setForm();
    this.errorText$.next('');
    this.unSubscriptions();
    this.closeEditModal.emit();
  }

  closeDialogSuccess() {
    this.originSelectDefault();
    this.setForm();
    this.errorText$.next('');
    this.unSubscriptions();
    this.closeEditModalSuccess.emit();
  }

  confirmModal() {
    this.loading = true;
    const editForm = this.editMakeFormGroup.getRawValue() as IEditForm;
    if (!editForm.makeName) {
      this.editMakeFormGroup.setValue({
        ...editForm,
        errorMakeName: 'Please, add a make name',
        errorMakeNameBorder: true,
      });
    }

    if (!editForm.origin) {
      this.editMakeFormGroup.setValue({
        ...editForm,
        errorOrigin: 'Please, add an origin',
        errorOriginBorder: true,
      });
      const elem =
        this._element.nativeElement.querySelector('#originselectedit');
      this._renderer.setStyle(elem, 'borderColor', 'red');
    }

    if (this.editMakeFormGroup.valid) {
      this.originSelectDefault();
      this.editMakeFormGroup.setValue({
        ...editForm,
        errorMakeName: '',
        errorMakeNameBorder: false,
        errorOrigin: '',
        errorOriginBorder: false,
      });

      this._store.dispatch(
        makeActions.editMake({ id: this.id, values: editForm })
      );
      this.editMakeSub = this._store
        .select(makeSelector.editMakeSuccess)
        .subscribe((data) => {
          if (data) {
            this._messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Data Updated successfully',
            });
            this.closeDialogSuccess();
          }
        });

      this.errorSub = this._store
        .select(makeSelector.editMakeError)
        .subscribe((data) => {
          if (data) {
            this.errorText$.next(data);
          }
        });
    }
  }

  setForm() {
    this.formSub = this._store
      .select(makeSelector.makeData)
      .subscribe((data) => {
        this.editMakeFormGroup.setValue({
          origin: data.origin,
          makeName: data.makeName,
          company: data.company,
          yearFounded: data.yearFounded ? data.yearFounded.toString() : '',
          active: data.active,
          errorMakeName: '',
          errorMakeNameBorder: false,
          errorOrigin: '',
          errorOriginBorder: false,
        });
      });
  }

  getCountries() {
    this.countriesList$ = this._locationService.getCountriesList().pipe(
      map((data) => {
        return data.map((x) => ({
          name: x.name,
          code: x.name,
        }));
      })
    );
  }

  ngOnInit() {
    this.setForm();
    this.getCountries();
  }

  ngOnDestroy() {
    this.unSubscriptions();
  }
}
