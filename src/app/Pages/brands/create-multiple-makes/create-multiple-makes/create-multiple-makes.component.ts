import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../Store/app.state';
import { makeActions } from '../../../../Store/Make/make.action';
import { makeSelector } from '../../../../Store/Make/make.selector';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CONSTANTS } from '../../../../Constants';

@Component({
  selector: 'app-create-multiple-makes',
  templateUrl: './create-multiple-makes.component.html',
  styleUrl: './create-multiple-makes.component.scss',
  providers: [MessageService],
})
export class CreateMultipleMakesComponent {
  fileName!: string;
  fileSelected?: File;
  createMultipleMakesResponse: boolean = false;
  errorText!: string;
  private createMakesResponseSubscription!: Subscription;
  private createMakesErrorSubscription!: Subscription;

  constructor(
    private _store: Store<IAppState>,
    private messageService: MessageService
  ) {}
  onFileChange(file: File) {
    this.fileName = file.name;
    this.fileSelected = file;
  }

  deleteError() {
    setTimeout(() => {
      this.errorText = '';
    }, 5000);
  }

  handleSubmit() {
    if (this.fileSelected  && this.fileSelected.type === CONSTANTS.XLSX_FILE_EXT) {
      this._store.dispatch(
        makeActions.createMultipleMakes({ file: this.fileSelected })
      );
      this.createMakesResponseSubscription = this._store
        .select(makeSelector.createMultipleMakesResponse)
        .subscribe((data) => {
          if (data) {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Data Upĺoaded successfully',
            });
            this.clearForm();
            this.createMakesResponseSubscription.unsubscribe();
          }
        });

      this.createMakesErrorSubscription = this._store
        .select(makeSelector.createMultipleMakesError)
        .subscribe((data) => {
          if (data) {
            this.errorText = data;
            this.createMakesErrorSubscription.unsubscribe();
            this.deleteError();
          }
        });
    } else {
      this.errorText = 'Please select a .xlsx file';
      this.deleteError();
    }
  }

  clearForm() {
    this.fileName = '';
    this.fileSelected = undefined;
    this.deleteError()
  }
}
