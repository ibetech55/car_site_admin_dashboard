import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../Store/app.state';
import { makeActions } from '../../../../Store/Make/make.action';
import { Observable, delay } from 'rxjs';
import { IGetMake } from '../../../../Data/Brand/Makes/GetMakes';
import { makeSelector } from '../../../../Store/Make/make.selector';
import { modelActions } from '../../../../Store/Model/model.action';
import { IGetModelByMakeId } from '../../../../Data/Brand/Model/GetModel';
import { modelSelector } from '../../../../Store/Model/model.selector';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-make-details',
  templateUrl: './make-details.component.html',
  styleUrl: './make-details.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class MakeDetailsComponent {
  constructor(
    private _router: ActivatedRoute,
    private _store: Store<IAppState>,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  id: string = this._router.snapshot.params['id'];
  makeData$!: Observable<IGetMake>;
  modelData$!: Observable<IGetModelByMakeId[]>;
  editDialog: boolean = false;
  editData!: IGetMake;
  deleteResp$!: Observable<boolean>;
  loading = false;

  @Output() visibilityChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  openEditModal() {
    this.editDialog = true;
    this.visibilityChange.emit(this.editDialog);
  }

  closeEditModal() {
    this.editDialog = false;
    this.visibilityChange.emit(this.editDialog);
  }

  openDeleteDialog(event: Event, data: IGetMake) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure you want to to delete ${data.makeName} from makes`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.loading = true;
        this._store.dispatch(makeActions.deleteMake({ id: data.id }));
        this.deleteResp$ = this._store.select(makeSelector.deleteMakeResponse);

        this.deleteResp$.pipe(delay(1000)).subscribe((data) => {
          if (data) {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Data deleted successfully',
            });
          }
          this.loading = false;
          window.location.href = '/brands/view_makes'
        });
      },
    });
  }

  ngOnInit() {
    this._store.dispatch(makeActions.getMakeById({ id: this.id }));
    this.makeData$ = this._store.select(makeSelector.makeData);
    this._store.dispatch(modelActions.getModelByMakeId({ makeId: this.id }));
    this.modelData$ = this._store.select(modelSelector.modelByMakeData);
    this.makeData$.subscribe((data) => (this.editData = data));
  }
}
