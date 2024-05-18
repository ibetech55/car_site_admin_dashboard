import { Component, EventEmitter, Input, Output } from '@angular/core';
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

@Component({
  selector: 'app-edit-model-modal',
  templateUrl: './edit-model-modal.component.html',
  styleUrl: './edit-model-modal.component.scss',
})
export class EditModelModalComponent {
  constructor(
    private _store: Store<IAppState>,
    private _builder: FormBuilder
  ) {}

  @Input() showDialog: boolean = false;
  @Input() loading: boolean = false;
  @Output() dialogClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() editDialog = new EventEmitter<boolean>();
  @Output() closeEditModal = new EventEmitter<void>();
  @Input() editData!: IEditModel;
  @Input() id!: string;
  makesList$!: Observable<ISelect[]>;
  editResponseSub!: Subscription;
  editErrorSub!: Subscription;
  editError$ = new BehaviorSubject<string>('');

  editModelFormGroup = this._builder.group({
    modelName: this._builder.control('', Validators.required),
    makeId: this._builder.control('', Validators.required),
    active: this._builder.control(false, Validators.required),
    yearFounded: this._builder.control(''),
  });

  confirmModal() {
    this.loading = true;
    const editForm = this.editModelFormGroup.getRawValue() as IEditModel;
    this._store.dispatch(
      modelActions.editModel({ id: this.id, values: editForm })
    );

    this.editResponseSub = this._store
      .select(modelSelector.editModelResponse)
      .subscribe((data) => {
        if (data) {
          this.showDialog = false;
          this.dialogClosed.emit();
          this.loading = false;
          this.editResponseSub.unsubscribe();
          window.location.href = `brands/model/${this.id}`;
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

  closeDialog() {
    this.showDialog = false;
    this.dialogClosed.emit();
    this.editError$.next('')
    this.setForm()
  }

  setForm() {
    this._store.select(modelSelector.modelData).subscribe((data) => {
      this.editModelFormGroup.setValue({
        makeId: data.makeId,
        modelName: data.modelName,
        active: data.active,
        yearFounded: data.yearFounded ? data.yearFounded.toString() : '',
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
