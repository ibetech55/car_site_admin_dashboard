import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IAppState } from '../../../Store/app.state';
import { modelActions } from '../../../Store/Model/model.action';
import { Observable } from 'rxjs';
import { IGetModelById } from '../../../Data/Brand/Model/GetModel';
import { modelSelector } from '../../../Store/Model/model.selector';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrl: './model-details.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class ModelDetailsComponent {
  constructor(
    private _router: ActivatedRoute,
    private _store: Store<IAppState>,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  id: string = this._router.snapshot.params['id'];
  modelData$!: Observable<IGetModelById>;
  editDialog: boolean = false;
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
  ngOnInit() {
     this._store.dispatch(modelActions.getModelById({ id: this.id }));
    this.modelData$ = this._store.select(modelSelector.modelData);
  }
}
