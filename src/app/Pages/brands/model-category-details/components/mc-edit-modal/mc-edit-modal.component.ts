import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { IAppState } from '../../../../../Store/app.state';
import { BehaviorSubject, Subscription } from 'rxjs';
import { makeSelector } from '../../../../../Store/Make/make.selector';
import { modelCategorySelector } from '../../../../../Store/ModelCategory/model.category.selector';
import { modelCategoryActions } from '../../../../../Store/ModelCategory/model.category.action';

interface IEditForm {
  type: string;
  active: boolean;
  errorTypeText: string;
  errorTypeBorder: boolean;
}

@Component({
  selector: 'app-mc-edit-modal',
  templateUrl: './mc-edit-modal.component.html',
  styleUrl: './mc-edit-modal.component.scss',
  providers: [MessageService],
})
export class McEditModalComponent {
  constructor(
    private _store: Store<IAppState>,
    private _builder: FormBuilder,
    private _messageService: MessageService
  ) {}

  @Input() showDialog!: boolean;
  @Input() closeEditModal!: () => void;
  @Input() getMCbyId!: () => void;
  @Input() id!: string;

  formSub = new Subscription();
  updateMCSuccessSub = new Subscription();
  errorSub = new Subscription();
  errorText$ = new BehaviorSubject('');

  editMcForm = this._builder.group({
    type: this._builder.control('', Validators.required),
    active: this._builder.control(false, Validators.required),
    errorTypeText: this._builder.control(''),
    errorTypeBorder: this._builder.control(false),
  });

  setForm() {
    this.formSub = this._store
      .select(modelCategorySelector.modelCategoryData)
      .subscribe((data) => {
        this.editMcForm.setValue({
          type: data.type,
          active: data.active,
          errorTypeBorder: false,
          errorTypeText: '',
        });
      });
  }

  confirmModal() {
    const editForm = this.editMcForm.getRawValue() as IEditForm;

    if (!editForm.type) {
      this.editMcForm.setValue({
        ...editForm,
        errorTypeText: 'Please, add a type',
        errorTypeBorder: true,
      });
    }

    if (this.editMcForm.valid) {
      this._store.dispatch(
        modelCategoryActions.updateModelCategory({
          id: this.id,
          values: editForm,
        })
      );
      this.updateMCSuccessSub = this._store
        .select(modelCategorySelector.updateMCSuccess)
        .subscribe((data) => {
          if (data) {
            this.getMCbyId();
            this.closeEditModal();
            this._messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Data updated successfully',
            });
            this.updateMCSuccessSub.unsubscribe();
          }
        });

      this.errorSub = this._store
        .select(modelCategorySelector.updateMCError)
        .subscribe((data) => {
          if (data) {
            this.errorText$.next(data);
          }
        });
    }
  }

  ngOnInit() {
    this.getMCbyId();
    this.setForm();
  }

  ngOnDestroy() {
    this.formSub.unsubscribe();
    this.updateMCSuccessSub.unsubscribe();
    this.errorSub.unsubscribe();
  }
}
