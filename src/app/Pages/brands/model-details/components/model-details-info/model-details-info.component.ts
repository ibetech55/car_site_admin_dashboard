import { Component, Input } from '@angular/core';
import { IGetModelById } from '../../../../../Data/Brand/Model/GetModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-model-details-info',
  templateUrl: './model-details-info.component.html',
  styleUrl: './model-details-info.component.scss',
})
export class ModelDetailsInfoComponent {
  @Input() modelData!: IGetModelById;
  @Input() openEditModal!: () => void;
}
