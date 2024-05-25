import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../Store/app.state';
import { makeActions } from '../../../Store/Make/make.action';
import { Observable, delay } from 'rxjs';
import { IGetMake } from '../../../Data/Brand/Makes/GetMakes';
import { makeSelector } from '../../../Store/Make/make.selector';
import { modelActions } from '../../../Store/Model/model.action';
import { IGetModelByMakeId } from '../../../Data/Brand/Model/GetModel';
import { modelSelector } from '../../../Store/Model/model.selector';
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
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService
  ) {}
  id: string = this._router.snapshot.params['id'];
  makeData$!: Observable<IGetMake>;
  modelData$!: Observable<IGetModelByMakeId[]>;
  editDialog: boolean = false;
  editData!: IGetMake;
  deleteResp$!: Observable<boolean>;
  loading = false;

  openEditModal() {
    this.editDialog = true;
  }


  closeEditModal() {
    this.editDialog = false;
  }

  closeEditModalSuccess() {
    this.getMake();
    this.editDialog = false;
  }

  openDeleteDialog(event: Event) {
    let deleteData:IGetMake = {
      id: '',
      makeName: '',
      origin: '',
      makeLogo: '',
      active: false,
      yearFounded: 0,
      company: '',
      createdAt: '',
      updatedAt: ''
    };
    this._store.select(makeSelector.makeData).subscribe(data=>{
      deleteData = data
    })
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure you want to to delete ${deleteData.makeName} from makes`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.loading = true;
        this._store.dispatch(makeActions.deleteMake({ id: deleteData.id }));
        this.deleteResp$ = this._store.select(makeSelector.deleteMakeResponse);

        this.deleteResp$.pipe(delay(1000)).subscribe((data) => {
          if (data) {
            this._messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Data deleted successfully',
            });
          }
          this.loading = false;
          window.location.href = '/brands/view_makes';
        });
      },
    });
  }

  getMake() {
    this._store.dispatch(makeActions.getMakeById({ id: this.id }));
    this.makeData$ = this._store.select(makeSelector.makeData);
  }

  getModelByMake() {
    this._store.dispatch(modelActions.getModelByMakeId({ makeId: this.id }));
    this.modelData$ = this._store.select(modelSelector.modelByMakeData);
  }

  ngOnInit() {
    this.getMake();
    this.getModelByMake();
  }
}
