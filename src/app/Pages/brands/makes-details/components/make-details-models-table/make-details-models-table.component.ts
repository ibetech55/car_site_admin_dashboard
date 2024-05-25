import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetModel, IGetModelByMakeId } from '../../../../../Data/Brand/Model/GetModel';

@Component({
  selector: 'app-make-details-models-table',
  templateUrl: './make-details-models-table.component.html',
  styleUrl: './make-details-models-table.component.scss',
})
export class MakeDetailsModelsTableComponent {
  @Input() modelData$!: Observable<IGetModelByMakeId[]>;
}
