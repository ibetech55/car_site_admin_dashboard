import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() label!: string;
  @Input() name!: string;
  @Input() placeholder!: string;
  @Input() size!: string;
  @Input() error?: string;
  @Input() formControlName!: string;
  @Input() formControl!: FormControl;
  @Input() isCheckBox: boolean = false;
}
