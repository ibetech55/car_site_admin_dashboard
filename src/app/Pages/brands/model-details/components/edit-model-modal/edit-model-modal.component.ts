import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IAppState } from '../../../../../Store/app.state';
import { Store } from '@ngrx/store';
import { IEditModel } from '../../../../../Data/Brand/Model/UpdateModel';
import { modelSelector } from '../../../../../Store/Model/model.selector';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { IGetMakesList } from '../../../../../Data/Brand/Makes/GetMakes';
import { ISelect } from '../../../../../Data/Common';
import { makeSelector } from '../../../../../Store/Make/make.selector';
import { makeActions } from '../../../../../Store/Make/make.action';
import { modelActions } from '../../../../../Store/Model/model.action';
import { ConfirmationService, MessageService } from 'primeng/api';

interface IEditForm {
  modelName: string;
  makeId: string;
  active: boolean;
  yearFounded: string;
  errorModelName: string;
  errorModelNameBorder: boolean;
  errorMake: string;
  errorMakeBorder: boolean;
}

@Component({
  selector: 'app-edit-model-modal',
  templateUrl: './edit-model-modal.component.html',
  styleUrl: './edit-model-modal.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class EditModelModalComponent {
  constructor(
    private _store: Store<IAppState>,
    private _builder: FormBuilder,
    private _element: ElementRef<HTMLDivElement>,
    private _renderer: Renderer2,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService
  ) {}

  @Input() showDialog: boolean = false;
  @Input() loading: boolean = false;
  @Output() dialogClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeEditModalSuccess: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() editDialog = new EventEmitter<boolean>();
  @Output() closeEditModal = new EventEmitter<void>();
  @Input() editData!: IEditModel;
  @Input() id!: string;
  makesList$!: Observable<ISelect[]>;
  editResponseSub!: Subscription;
  editErrorSub!: Subscription;
  editError$ = new BehaviorSubject<string>('');
  borderColor = '#ced4da';
  makeSelectId = '#makeselect';

  editModelFormGroup = this._builder.group({
    modelName: this._builder.control('', Validators.required),
    makeId: this._builder.control('', Validators.required),
    active: this._builder.control(false, Validators.required),
    yearFounded: this._builder.control(''),
    errorModelName: this._builder.control(''),
    errorModelNameBorder: this._builder.control(false),
    errorMake: this._builder.control(''),
    errorMakeBorder: this._builder.control(false),
  });

  makeSelectDefault() {
    const elem = this._element.nativeElement.querySelector(this.makeSelectId);
    if (elem) {
      this._renderer.setStyle(elem, 'borderColor', this.borderColor);
    }
  }

  confirmModal() {
    this.loading = true;
    const editForm = this.editModelFormGroup.getRawValue() as IEditForm;
    if (!editForm.modelName) {
      this.editModelFormGroup.setValue({
        ...editForm,
        errorModelName: 'Please, add a model name',
        errorModelNameBorder: true,
      });
    }

    if (!editForm.makeId) {
      this.editModelFormGroup.setValue({
        ...editForm,
        errorMake: 'Please, add a make',
        errorMakeBorder: true,
      });
      const elem = this._element.nativeElement.querySelector(this.makeSelectId);
      this._renderer.setStyle(elem, 'borderColor', 'red');
    }

    if (this.editModelFormGroup.valid) {
      this.editModelFormGroup.setValue({
        ...editForm,
        errorModelName: '',
        errorModelNameBorder: false,
        errorMake: '',
        errorMakeBorder: false,
      });
      this._store.dispatch(
        modelActions.editModel({ id: this.id, values: editForm })
      );

      this.editResponseSub = this._store
        .select(modelSelector.editModelResponse)
        .subscribe((data) => {
          if (data) {
            this.makeSelectDefault();
            this._messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Data Updated successfully',
            })
            this.closeEditModalSuccess.emit();
            this.editResponseSub.unsubscribe();
          }
        });

      this.editErrorSub = this._store
        .select(modelSelector.editModelError)
        .subscribe((error) => {
          if (error) {
            this.editError$.next(error);
            this.loading = false;
            this.editErrorSub.unsubscribe();
          }
        });
    }
    this.loading = false;
  }

  closeDialog() {
    this.showDialog = false;
    this.editError$.next('');
    this.setForm();
    this.makeSelectDefault();
    this.dialogClosed.emit();
  }

  setForm() {
    this._store.select(modelSelector.modelData).subscribe((data) => {
      this.editModelFormGroup.setValue({
        makeId: data.makeId,
        modelName: data.modelName,
        active: data.active,
        yearFounded: data.yearFounded ? data.yearFounded.toString() : '',
        errorMake: '',
        errorMakeBorder: false,
        errorModelName: '',
        errorModelNameBorder: false,
      });
    });
  }
  getMakesList() {
    this._store.dispatch(makeActions.getMakesList());
    this.makesList$ = this._store.select(makeSelector.makeList).pipe(
      map((data) =>
        data.map((x) => ({
          name: x.makeName,
          code: x.id,
        }))
      )
    );
  }

  ngOnInit() {
    this.setForm();
    this.getMakesList();
  }
}
