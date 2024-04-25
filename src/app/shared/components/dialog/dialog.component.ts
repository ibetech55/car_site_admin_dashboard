import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @Input() visible: boolean = false;
  @Input() width: string = '50vw';
  @Input() title: string = '';
  @Input() confirmButtonLabel: string = 'Submit'
  @Input() cancelButtonLabel: string = 'Cancel'
  @Output() onHide: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();

  onDialogHide() {
    // Implement your logic for handling the onHide event here
    // For example, you can perform actions like resetting form data or any other cleanup
    alert('Dialog hidden');
  }
}
