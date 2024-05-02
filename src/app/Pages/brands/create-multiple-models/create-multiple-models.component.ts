import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../Store/app.state';
import { modelActions } from '../../../Store/Model/model.action';
import { modelSelector } from '../../../Store/Model/model.selector';
import { delay } from 'rxjs';
import { IMultipleModelErrors } from '../../../Data/Brand/Model/CreateModel';
import { CONSTANTS } from '../../../Constants';

@Component({
  selector: 'app-create-multiple-models',
  templateUrl: './create-multiple-models.component.html',
  styleUrl: './create-multiple-models.component.scss',
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
    columnError:''
  };

  constructor(private _store: Store<IAppState>) {}

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

  handleSubmit() {
    if (this.fileSelected && this.fileSelected.type === CONSTANTS.XLSX_FILE_EXT) {
      this.loading = true;

      this._store.dispatch(
        modelActions.createMultipleModels({ file: this.fileSelected as File })
      );
      this._store
        .select(modelSelector.errorsMultipleModels)
        .pipe(delay(2000))
        .subscribe((data) => {
          if (data) {
            this.errors.modelError = data.modelError;
            this.errors.makeError = data.makeError;
            this.errors.modelCategoryError = data.modelCategoryError;
            this.errors.columnError = data.columnError;
            this.loading = false;
          } else {
            this.clearForm();
            this.loading = false;
          }
        });
    } else {
      this.errorText = 'Please select a .xlsx file';
    }
  }
}
