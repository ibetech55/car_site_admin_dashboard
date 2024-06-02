import { Component, Input } from '@angular/core';
import { IGetModelCategory } from '../../../../../Data/Brand/ModelCategory/GetModelCategory';

@Component({
  selector: 'app-mc-details',
  templateUrl: './mc-details.component.html',
  styleUrl: './mc-details.component.scss',
})
export class McDetailsComponent {
  @Input() mcData!: IGetModelCategory;
  @Input() openEditModal!: () => void;
}
