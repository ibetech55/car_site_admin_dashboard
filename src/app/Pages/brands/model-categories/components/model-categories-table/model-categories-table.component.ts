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
  constructor(
    private _confirmDiaglog: ConfirmDialog,
  ) {}
  @Input() modelCategoriesData$!: Observable<IGetModelCategory[]>;

  openDeleteDialog(event: Event, id: string, type: string) {
   this._confirmDiaglog.handle(event, {
    message:`Are you sure you want to delete the following Model Category ${type}`,
    accept:()=>alert(888),
    reject:()=>alert(666)
   })
  }

  openActivateDialog(event: Event, id: string, type: string) {
    this._confirmDiaglog.handle(event, {
     message:`Are you sure you want to delete the following Model Category ${type}`,
     accept:()=>alert(888),
     reject:()=>alert(666)
    })
   }
}
