import { Component, Injectable, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
interface IConfirmDiaologProps {
  message: string;
  accept: () => void;
  reject?: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialog {
  constructor(private _confirmationService: ConfirmationService) {}

  handle(event: Event, values: IConfirmDiaologProps) {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: values.message,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        values.accept();
      },
      reject: () => {
        if (values.reject) {
          values.reject();
        }
      },
    });
  }
}
