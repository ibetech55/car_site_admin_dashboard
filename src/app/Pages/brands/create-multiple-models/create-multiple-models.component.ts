import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../Store/app.state';
import { modelActions } from '../../../Store/Model/model.action';
import { modelSelector } from '../../../Store/Model/model.selector';
import { Subscription } from 'rxjs';
import { IMultipleModelErrors } from '../../../Data/Brand/Model/CreateModel';
import { CONSTANTS } from '../../../Constants';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-multiple-models',
  templateUrl: './create-multiple-models.component.html',
  styleUrl: './create-multiple-models.component.scss',
  providers: [MessageService],
})
export class CreateMultipleModelsComponent {
  fileName!: string;
  fileSelected?: File;
  loading: boolean = false;
  errorText: string = '';
  errors: IMultipleModelErrors = {
    modelError: '',
    makeError: '',
    modelCategoryError: '',
    columnError: '',
  };
  private _createMultipleModelsResponseSub!: Subscription;
  private _errorMultipleModelsResponseSub!: Subscription;

  constructor(
    private _store: Store<IAppState>,
    private _messageService: MessageService
  ) {}

  onFileChange(file: File) {
    this.fileName = file.name;
    this.fileSelected = file;
  }

  clearForm() {
    this.fileName = '';
    this.fileSelected = undefined;
    this.errorText = '';
    this.errors = {};
  }

  removeErrors(){
    setTimeout(()=>{
      this.errorText = '';
      this.errors = {};
    }, 5000)
  }

  handleSubmit() {
    this.loading = true;

    if (
      this.fileSelected &&
      this.fileSelected.type === CONSTANTS.XLSX_FILE_EXT
    ) {

      this._store.dispatch(
        modelActions.createMultipleModels({ file: this.fileSelected as File })
      );
      this._createMultipleModelsResponseSub = this._store
        .select(modelSelector.createMultipleModelsResponse)
        .subscribe((data) => {
          if (data) {
            this._messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Data Upĺoaded successfully',
            });
            this.clearForm()
          }
          this._createMultipleModelsResponseSub.unsubscribe();
        });

      this._errorMultipleModelsResponseSub = this._store
        .select(modelSelector.errorsMultipleModels)
        .subscribe((data) => {
          if (data) {
            this.errors.modelError = data.modelError;
            this.errors.makeError = data.makeError;
            this.errors.modelCategoryError = data.modelCategoryError;
            this.errors.columnError = data.columnError;
            this.removeErrors()
          }
          this._errorMultipleModelsResponseSub.unsubscribe()
        });
    } else {
      this.errorText = 'Please select an .xlsx file';
      this.removeErrors()
    }
    this.loading = false;
  }
}
