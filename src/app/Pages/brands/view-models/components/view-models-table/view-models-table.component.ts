import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetModelPagination } from '../../../../../Data/Brand/Model/GetModel';
import { TableLazyLoadEvent } from 'primeng/table';
interface IIdsData {
  id: String;
  modelName: string;
}
@Component({
  selector: 'app-view-models-table',
  templateUrl: './view-models-table.component.html',
  styleUrl: './view-models-table.component.scss',
})
export class ViewModelsTableComponent {
  @Input() idsData: IIdsData[] = [];
  @Input() modelsData$!: Observable<IGetModelPagination>;
  @Input() loading!: boolean;
  @Input() textSelectAll!: boolean;
  @Input() openStatusDialog!: (event: Event, requestType: string) => void;
  @Input() selectAll!: () => void;
  @Input() checkId!: (id: string) => void;
  @Input() handleCheckbox!: (data: IIdsData) => void;
  @Input() getModels!: (event?: TableLazyLoadEvent) => void;
}
