import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CONSTANTS } from '../../../../../Constants';
import { makeActions } from '../../../../../Store/Make/make.action';
import { makeSelector } from '../../../../../Store/Make/make.selector';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { IAppState } from '../../../../../Store/app.state';

@Component({
  selector: 'app-create-multiple-makes-form',
  templateUrl: './create-multiple-makes-form.component.html',
  styleUrl: './create-multiple-makes-form.component.scss',
  providers: [MessageService],
})
export class CreateMultipleMakesFormComponent {
  constructor(
    private _store: Store<IAppState>,
    private messageService: MessageService
  ) {}
  @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  fileName!: string;
  fileSelected?: File;
  createMultipleMakesResponse: boolean = false;
  errorText!: string;
  private createMakesResponseSubscription!: Subscription;
  private createMakesErrorSubscription!: Subscription;

  handleSubmit() {
    this.loadingChange.emit(true);
    if (
      this.fileSelected &&
      this.fileSelected.type === CONSTANTS.XLSX_FILE_EXT
    ) {
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
    this.loadingChange.emit(false);
  }

  clearForm() {
    this.fileName = '';
    this.fileSelected = undefined;
    this.deleteError();
  }

  deleteError() {
    setTimeout(() => {
      this.errorText = '';
    }, 5000);
  }

  onFileChange(file: File) {
    this.fileName = file.name;
    this.fileSelected = file;
  }

}
