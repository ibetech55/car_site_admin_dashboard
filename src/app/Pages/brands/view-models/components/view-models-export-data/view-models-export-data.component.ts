import { Component, Input } from '@angular/core';
import { IExportType } from '../../../../../Data/Common';
import { IExportModelsData } from '../../../../../Data/Brand/Model/GetModel';

@Component({
  selector: 'app-view-models-export-data',
  templateUrl: './view-models-export-data.component.html',
  styleUrl: './view-models-export-data.component.scss',
})
export class ViewModelsExportDataComponent {
  @Input() exportData!: IExportModelsData;
  @Input() exportType!: IExportType;
  @Input() handleExportType!: (type: string) => void;
  @Input() handleExport!: () => void;
}
