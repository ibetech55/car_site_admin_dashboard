import { Component, Input } from '@angular/core';
import { IExportMakesData } from '../../../../../Data/Brand/Makes/GetMakes';
import { IExportType } from '../../../../../Data/Common';

@Component({
  selector: 'app-view-makes-export-data',
  templateUrl: './view-makes-export-data.component.html',
  styleUrl: './view-makes-export-data.component.scss',
})
export class ViewMakesExportDataComponent {
  @Input() exportData!: IExportMakesData;
  @Input() exportType!: IExportType;
  @Input() handleExportType!: (type: string) => void;
  @Input() handleExport!: () => void;
}
