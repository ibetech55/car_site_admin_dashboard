import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CONSTANTS } from '../../../../../Constants';
import { IMultipleModelErrors } from '../../../../../Data/Brand/Model/CreateModel';
import { modelActions } from '../../../../../Store/Model/model.action';
import { modelSelector } from '../../../../../Store/Model/model.selector';
import { IAppState } from '../../../../../Store/app.state';
import { HandleDownload } from '../../../../../../utils/HandleDownload';

@Component({
  selector: 'app-create-multiple-models-form',
  templateUrl: './create-multiple-models-form.component.html',
  styleUrl: './create-multiple-models-form.component.scss',
})
export class CreateMultipleModelsFormComponent {
  @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );
  templateSub = new Subscription();
  fileName!: string;
  fileSelected?: File;
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
    private _messageService: MessageService,
    private _handleDownload: HandleDownload
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

  removeErrors() {
    setTimeout(() => {
      this.errorText = '';
      this.errors = {};
    }, 5000);
  }

  handleSubmit() {
    this.loadingChange.emit(true);
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
            this.clearForm();
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
            this.removeErrors();
          }
          this._errorMultipleModelsResponseSub.unsubscribe();
        });
    } else {
      this.errorText = 'Please select an .xlsx file';
      this.removeErrors();
    }
    this.loadingChange.emit(false);
  }

  downloadTemplate() {
    this._store.dispatch(modelActions.downloadCreateModelsTemplate());
    this.templateSub = this._store
      .select(modelSelector.downloadCreateModelsTemplate)
      .subscribe((blob) => {
        if (blob) {
          this._handleDownload.execute(blob, 'CreateModelsTemplate.xlsx');
          this.templateSub.unsubscribe();
        }
      });
  }

  ngOnInit() {
    this.templateSub.unsubscribe();
  }
}
