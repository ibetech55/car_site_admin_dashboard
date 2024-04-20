import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @Input() visible!: boolean;
  @Input() width: string = '50vw';
  @Input() title: string = '';
  @Output() onHide: EventEmitter<void> = new EventEmitter<void>();
}
