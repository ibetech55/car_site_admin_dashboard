import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-text',
  templateUrl: './label-text.component.html',
  styleUrl: './label-text.component.scss',
})
export class LabelTextComponent {
  @Input() label!: string;
  @Input() text!: string;
}
