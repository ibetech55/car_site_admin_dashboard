import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGetMake } from '../../../../../../Data/Brand/Makes/GetMakes';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../../../Store/app.state';
import { makeSelector } from '../../../../../../Store/Make/make.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEditMake } from '../../../../../../Data/Brand/Makes/EditMake';
import { makeActions } from '../../../../../../Store/Make/make.action';
import { Observable, map } from 'rxjs';
import { LocationService } from '../../../../../../services/location/location.service';
import { ISelect } from '../../../../../../Data/Common';
@Component({
  selector: 'app-edit-make-dialog',
  templateUrl: './edit-make-dialog.component.html',
  styleUrl: './edit-make-dialog.component.scss',
})
export class EditMakeDialogComponent {
  constructor(
    private _store: Store<IAppState>,
    private _builder: FormBuilder,
    private _locationService: LocationService
  ) {}
  @Input() showDialog: boolean = false;
  @Input() loading: boolean = false;
  @Output() dialogClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() editDialog = new EventEmitter<boolean>();
  @Output() closeEditModal = new EventEmitter<void>();
  @Input() editData!: IEditMake;
  @Input() id!: string;
  countriesList$!: Observable<ISelect[]>;

  closeDialog() {
    this.showDialog = false;
    this.dialogClosed.emit();
  }

  confirmModal() {
    this.loading = true;
    const editForm = this.editMakeFormGroup.getRawValue() as IEditMake;
    this._store.dispatch(
      makeActions.editMake({ id: this.id, values: editForm })
    );
    this.showDialog = false;
    this.dialogClosed.emit();
    this.loading = false;
    window.location.href = `brands/make/${this.id}`;
  }

  editMakeFormGroup = this._builder.group({
    makeName: this._builder.control('', Validators.required),
    origin: this._builder.control('', Validators.required),
    company: this._builder.control(''),
    yearFounded: this._builder.control(''),
    active: this._builder.control(false, Validators.required),
  });

  setForm() {
    this._store.select(makeSelector.makeData).subscribe((data) => {
      this.editMakeFormGroup.setValue({
        origin: data.origin,
        makeName: data.makeName,
        company: data.company,
        yearFounded: data.yearFounded ? data.yearFounded.toString() : '',
        active: data.active,
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
    this.getCountries();
  }
}
