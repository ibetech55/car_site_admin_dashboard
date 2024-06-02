import { Component, model } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../Store/app.state';
import { modelCategoryActions } from '../../../../Store/ModelCategory/model.category.action';
import { Observable, Subscription } from 'rxjs';
import { IGetModelCategory } from '../../../../Data/Brand/ModelCategory/GetModelCategory';
import { modelCategorySelector } from '../../../../Store/ModelCategory/model.category.selector';
import { ConfirmDialog } from '../../../../../utils/ConfirmDialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model-category-details-page',
  templateUrl: './model-category-details-page.component.html',
  styleUrl: './model-category-details-page.component.scss',
  providers: [ConfirmDialog, MessageService],
})
export class ModelCategoryDetailsPageComponent {
  constructor(
    private _router: ActivatedRoute,
    private _router2: Router,
    private _store: Store<IAppState>,
    private _confirmDialog: ConfirmDialog,
    private _messageService: MessageService
  ) {}

  id: string = this._router.snapshot.params['id'];
  mcDataSub = new Subscription();
  mcData!: IGetModelCategory;
  editDialog = false;
  deleteSub = new Subscription();
  loading = false;

  openEditModal() {
    this.editDialog = true;
  }

  closeEditModal() {
    this.editDialog = false;
  }

  getMCbyId() {
    this._store.dispatch(
      modelCategoryActions.getModelCategoryById({ id: this.id })
    );
    this.mcDataSub = this._store
      .select(modelCategorySelector.modelCategoryData)
      .subscribe((data) => (this.mcData = data));
  }

  deleteModelCategory() {
    this.loading = true
    this._store.dispatch(
      modelCategoryActions.deleteModelCategory({ id: this.id })
    );
    this.deleteSub = this._store
      .select(modelCategorySelector.deleteMCSuccess)
      .subscribe((data) => {
        if (data) {
          this._messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Data delete successfully',
          });
          this.deleteSub.unsubscribe();

          setTimeout(() => {
            this.loading = false
            this._router2.navigate(['/brands/model_categories']);
          }, 2000);
        }
      });
  }

  openDeleteDialog(event: Event) {
    this._confirmDialog.handle(event, {
      message: `Do you wish to delete ${this.mcData.type}?`,
      accept: () => {
        this.deleteModelCategory();
      },
    });
  }

  ngOnInit() {
    this.getMCbyId();
  }

  ngOnDestroy() {
    this.deleteSub.unsubscribe();
  }
}
