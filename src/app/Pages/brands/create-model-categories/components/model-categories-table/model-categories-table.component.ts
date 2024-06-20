import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetModelCategory } from '../../../../../Data/Brand/ModelCategory/GetModelCategory';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from '../../../../../../utils/ConfirmDialog';

@Component({
  selector: 'app-model-categories-table',
  templateUrl: './model-categories-table.component.html',
  styleUrl: './model-categories-table.component.scss',
  providers: [ConfirmationService, MessageService, ConfirmDialog],
})
export class ModelCategoriesTableComponent {
  constructor() {}
  @Input() modelCategoriesData$!: Observable<IGetModelCategory[]>;
}
