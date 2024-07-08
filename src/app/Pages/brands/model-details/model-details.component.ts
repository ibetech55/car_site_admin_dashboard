import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IAppState } from '../../../Store/app.state';
import { modelActions } from '../../../Store/Model/model.action';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { IGetModelById } from '../../../Data/Brand/Model/GetModel';
import { modelSelector } from '../../../Store/Model/model.selector';
import { EditModelModalComponent } from './components/edit-model-modal/edit-model-modal.component';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrl: './model-details.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ModelDetailsComponent {

  constructor(
    private _router: ActivatedRoute,
    private _store: Store<IAppState>,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService
  ) {}

  id: string = this._router.snapshot.params['id'];
  modelData!: IGetModelById;
  editDialog: boolean = false;
  @Output() visibilityChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  deleteSub = new Subscription();
  loading = false;
  destroy$ = new Subject<void>();

  openEditModal() {
    this.editDialog = true;
    this.visibilityChange.emit(this.editDialog);
  }

  closeEditModal() {
    this.editDialog = false;
    this.visibilityChange.emit(this.editDialog);
  }

  closeEditModalSuccess() {
    this.getModel();
    this.editDialog = false;
    this.visibilityChange.emit(this.editDialog);
  }

  getModel() {
    this._store.dispatch(modelActions.getModelById({ id: this.id }));
    this._store
      .select(modelSelector.modelData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IGetModelById) => {
        if (data) {
          this.modelData = data;
        }
      });
  }

  openDeleteDialog(event: Event) {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure you want to delete the following model ${this.modelData.modelName}`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.loading = true;
        this._store.dispatch(
          modelActions.deleteModel({ id: this.modelData.id })
        );
        this.deleteSub = this._store
          .select(modelSelector.deleteModelSuccess)
          .subscribe((data) => {
            if (data) {
              this._messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: 'Data deleted successfully',
              });
            }
            this.loading = false;
            this.deleteSub.unsubscribe();
            window.location.href = '/brands/view_makes';
          });
      },
    });
  }
  ngOnInit() {
    this.getModel();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.deleteSub.unsubscribe()
  }
}
