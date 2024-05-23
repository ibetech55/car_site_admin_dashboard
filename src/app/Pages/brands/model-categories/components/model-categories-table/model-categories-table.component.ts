import { Component, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGetModelCategory } from '../../../../../Data/Brand/ModelCategory/GetModelCategory';
import { modelCategoryActions } from '../../../../../Store/ModelCategory/model.category.action';
import { modelCategorySelector } from '../../../../../Store/ModelCategory/model.category.selector';
import { IAppState } from '../../../../../Store/app.state';

@Component({
  selector: 'app-model-categories-table',
  templateUrl: './model-categories-table.component.html',
  styleUrl: './model-categories-table.component.scss'
})
export class ModelCategoriesTableComponent {
  constructor(
  ) {}
  @Input() modelCategoriesData$!: Observable<IGetModelCategory[]>;
}
