import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-label',
  templateUrl: './section-label.component.html',
  styleUrl: './section-label.component.scss'
})
export class SectionLabelComponent {
  @Input() text!:string;
}
